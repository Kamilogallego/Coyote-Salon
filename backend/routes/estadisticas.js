const express = require("express");
const { requireAuth } = require("../middleware/auth");
const estadisticasRepository = require("../repositories/estadisticasRepository");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const estadisticas = await estadisticasRepository.obtener();
    res.json(estadisticas);
  })
);

module.exports = router;
