const express = require("express");
const { requireAuth } = require("../middleware/auth");
const estadisticasRepository = require("../repositories/estadisticasRepository");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const estadisticas = await estadisticasRepository.obtener();
  res.json(estadisticas);
});

module.exports = router;
