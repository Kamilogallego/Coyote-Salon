const express = require("express");
const rateLimit = require("express-rate-limit");
const { requireAuth } = require("../middleware/auth");
const asyncHandler = require("../middleware/asyncHandler");
const { tieneCampoTrampaLleno, seEnvioMuyRapido } = require("../utils/antiBot");

const solicitudesArtistasRepository = require("../repositories/solicitudesArtistasRepository");
const solicitudesEmpleoRepository = require("../repositories/solicitudesEmpleoRepository");
const solicitudesProveedoresRepository = require("../repositories/solicitudesProveedoresRepository");

const { validar: validarArtista } = require("../utils/validarArtista");
const { validar: validarEmpleo } = require("../utils/validarEmpleo");
const { validar: validarProveedor } = require("../utils/validarProveedor");

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

function registrarSolicitud(repositorio, validar) {
  return asyncHandler(async (req, res) => {
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

    const id = await repositorio.crear(req.body);
    res.status(201).json({ id });
  });
}

function listarSolicitudes(repositorio) {
  return asyncHandler(async (req, res) => {
    const solicitudes = await repositorio.listar();
    res.json(solicitudes);
  });
}

function eliminarSolicitud(repositorio, mensajeNoEncontrado) {
  return asyncHandler(async (req, res) => {
    const encontrado = await repositorio.eliminar(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ errores: [mensajeNoEncontrado] });
    }
    res.json({ ok: true });
  });
}

// --- Artistas ---
router.post("/artistas", limiteRegistro, registrarSolicitud(solicitudesArtistasRepository, validarArtista));
router.get("/artistas", requireAuth, listarSolicitudes(solicitudesArtistasRepository));
router.delete(
  "/artistas/:id",
  requireAuth,
  parsearId,
  eliminarSolicitud(solicitudesArtistasRepository, "Solicitud de artista no encontrada")
);

// --- Empleo ---
router.post("/empleo", limiteRegistro, registrarSolicitud(solicitudesEmpleoRepository, validarEmpleo));
router.get("/empleo", requireAuth, listarSolicitudes(solicitudesEmpleoRepository));
router.delete(
  "/empleo/:id",
  requireAuth,
  parsearId,
  eliminarSolicitud(solicitudesEmpleoRepository, "Solicitud de empleo no encontrada")
);

// --- Proveedores ---
router.post("/proveedores", limiteRegistro, registrarSolicitud(solicitudesProveedoresRepository, validarProveedor));
router.get("/proveedores", requireAuth, listarSolicitudes(solicitudesProveedoresRepository));
router.delete(
  "/proveedores/:id",
  requireAuth,
  parsearId,
  eliminarSolicitud(solicitudesProveedoresRepository, "Solicitud de proveedor no encontrada")
);

module.exports = router;
