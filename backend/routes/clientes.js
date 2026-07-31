const express = require("express");
const rateLimit = require("express-rate-limit");
const { requireAuth } = require("../middleware/auth");
const clientesRepository = require("../repositories/clientesRepository");
const { tieneCampoTrampaLleno, seEnvioMuyRapido } = require("../utils/antiBot");
const { validar } = require("../utils/validarCliente");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

const MENSAJES_DUPLICADO = {
  clientes_cedula_key: "Ya existe un registro con ese número de documento",
  clientes_correo_key: "Ya existe un registro con ese correo electrónico",
  clientes_telefono_key: "Ya existe un registro con ese número de teléfono",
};

function parsearId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ errores: ["ID de cliente inválido"] });
  }
  req.params.id = id;
  next();
}

const limiteRegistro = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errores: ["Demasiados registros desde esta red. Intenta de nuevo en unos minutos."] },
});

router.post(
  "/",
  limiteRegistro,
  asyncHandler(async (req, res) => {
    const esAdmin = Boolean(req.session.userId);

    if (!esAdmin && tieneCampoTrampaLleno(req.body)) {

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
        const mensaje = MENSAJES_DUPLICADO[err.constraint] || "Ya existe un registro con esos datos";
        return res.status(409).json({ errores: [mensaje] });
      }
      throw err;
    }
  })
);

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const clientes = await clientesRepository.listar(req.query);
    res.json(clientes);
  })
);

router.get(
  "/papelera",
  requireAuth,
  asyncHandler(async (req, res) => {
    await clientesRepository.purgarVencidos();
    const clientes = await clientesRepository.obtenerPapelera();
    res.json({ dias_retencion: clientesRepository.DIAS_RETENCION_PAPELERA, clientes });
  })
);

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
