const express = require("express");
const rateLimit = require("express-rate-limit");
const { requireAuth } = require("../middleware/auth");
const solicitudesRepository = require("../repositories/solicitudesRepository");
const { tieneCampoTrampaLleno, seEnvioMuyRapido } = require("../utils/antiBot");
const { validar } = require("../utils/validarSolicitud");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

function parsearId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ errores: ["ID de solicitud inválido"] });
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

    const id = await solicitudesRepository.crear(req.body);
    res.status(201).json({ id });
  })
);

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const solicitudes = await solicitudesRepository.listar(req.query);
    res.json(solicitudes);
  })
);

router.delete(
  "/:id",
  requireAuth,
  parsearId,
  asyncHandler(async (req, res) => {
    const encontrado = await solicitudesRepository.eliminar(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ errores: ["Solicitud no encontrada"] });
    }
    res.json({ ok: true });
  })
);

module.exports = router;
