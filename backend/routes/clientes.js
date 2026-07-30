const express = require("express");
const rateLimit = require("express-rate-limit");
const { requireAuth } = require("../middleware/auth");
const clientesRepository = require("../repositories/clientesRepository");
const { tieneCampoTrampaLleno, seEnvioMuyRapido } = require("../utils/antiBot");
const { validar } = require("../utils/validarCliente");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

// Las rutas :id reciben el parámetro como string desde la URL; se valida
// aquí (en vez de dejar que Postgres rechace un valor no numérico) para
// responder 400 en vez de un error de base de datos.
function parsearId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ errores: ["ID de cliente inválido"] });
  }
  req.params.id = id;
  next();
}

// Limite generoso para no bloquear a clientes reales que compartan red
// (wifi del restaurante), pero suficiente para frenar un flood de spam.
const limiteRegistro = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errores: ["Demasiados registros desde esta red. Intenta de nuevo en unos minutos."] },
});

// POST /api/clientes - registro público desde el formulario (también lo usa
// el botón "Agregar cliente" del dashboard, ya autenticado). Los chequeos
// anti-bot solo aplican a quien NO tiene sesión de admin iniciada: un
// admin logueado no es un bot y su formulario no manda campo trampa ni
// marca de tiempo.
router.post(
  "/",
  limiteRegistro,
  asyncHandler(async (req, res) => {
    const esAdmin = Boolean(req.session.userId);

    if (!esAdmin && tieneCampoTrampaLleno(req.body)) {
      // Bot detectado por el campo trampa: se responde como si hubiera ido
      // bien (sin tocar la base de datos) para no delatar el filtro.
      console.warn("Registro bloqueado por campo trampa", { ip: req.ip });
      return res.status(201).json({ id: null });
    }

    if (!esAdmin && seEnvioMuyRapido(req.body)) {
      return res.status(400).json({
        errores: ["El formulario se envió demasiado rápido. Espera unos segundos e intenta de nuevo."],
      });
    }

    const errores = validar(req.body);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const id = await clientesRepository.crear(req.body);
      res.status(201).json({ id });
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).json({ errores: ["Ya existe un registro con ese tipo y número de documento"] });
      }
      throw err;
    }
  })
);

// GET /api/clientes - listado para el dashboard (requiere sesión)
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const clientes = await clientesRepository.listar(req.query);
    res.json(clientes);
  })
);

// GET /api/clientes/papelera - clientes eliminados, pendientes de purga (requiere sesión)
router.get(
  "/papelera",
  requireAuth,
  asyncHandler(async (req, res) => {
    await clientesRepository.purgarVencidos();
    const clientes = await clientesRepository.obtenerPapelera();
    res.json({ dias_retencion: clientesRepository.DIAS_RETENCION_PAPELERA, clientes });
  })
);

// POST /api/clientes/eliminar-multiple - mover varios a la papelera a la vez (requiere sesión)
router.post(
  "/eliminar-multiple",
  requireAuth,
  asyncHandler(async (req, res) => {
    const ids = Array.isArray(req.body.ids) ? req.body.ids.map(Number).filter(Number.isInteger) : [];
    if (ids.length === 0) {
      return res.status(400).json({ errores: ["No se recibieron clientes para eliminar"] });
    }

    const eliminados = await clientesRepository.eliminarMultiple(ids);
    res.json({ ok: true, eliminados, dias_retencion: clientesRepository.DIAS_RETENCION_PAPELERA });
  })
);

// POST /api/clientes/restaurar-multiple - sacar varios de la papelera a la vez (requiere sesión)
router.post(
  "/restaurar-multiple",
  requireAuth,
  asyncHandler(async (req, res) => {
    const ids = Array.isArray(req.body.ids) ? req.body.ids.map(Number).filter(Number.isInteger) : [];
    if (ids.length === 0) {
      return res.status(400).json({ errores: ["No se recibieron clientes para restaurar"] });
    }

    const restaurados = await clientesRepository.restaurarMultiple(ids);
    res.json({ ok: true, restaurados });
  })
);

// POST /api/clientes/eliminar-definitivo-multiple - borrar varios de la papelera para siempre (requiere sesión)
router.post(
  "/eliminar-definitivo-multiple",
  requireAuth,
  asyncHandler(async (req, res) => {
    const ids = Array.isArray(req.body.ids) ? req.body.ids.map(Number).filter(Number.isInteger) : [];
    if (ids.length === 0) {
      return res.status(400).json({ errores: ["No se recibieron clientes para eliminar"] });
    }

    const eliminados = await clientesRepository.eliminarDefinitivoMultiple(ids);
    res.json({ ok: true, eliminados });
  })
);

// DELETE /api/clientes/:id - mover a la papelera (requiere sesión)
router.delete(
  "/:id",
  requireAuth,
  parsearId,
  asyncHandler(async (req, res) => {
    const encontrado = await clientesRepository.eliminarUno(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ errores: ["Cliente no encontrado"] });
    }
    res.json({ ok: true, dias_retencion: clientesRepository.DIAS_RETENCION_PAPELERA });
  })
);

// POST /api/clientes/:id/restaurar - sacar de la papelera (requiere sesión)
router.post(
  "/:id/restaurar",
  requireAuth,
  parsearId,
  asyncHandler(async (req, res) => {
    const encontrado = await clientesRepository.restaurar(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ errores: ["Cliente no encontrado en la papelera"] });
    }
    res.json({ ok: true });
  })
);

// DELETE /api/clientes/:id/definitivo - eliminar permanentemente desde la papelera (requiere sesión)
router.delete(
  "/:id/definitivo",
  requireAuth,
  parsearId,
  asyncHandler(async (req, res) => {
    const encontrado = await clientesRepository.eliminarDefinitivo(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ errores: ["Cliente no encontrado en la papelera"] });
    }
    res.json({ ok: true });
  })
);

module.exports = router;
module.exports.purgarPapeleraVencida = clientesRepository.purgarVencidos;
