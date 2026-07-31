const express = require("express");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const authRepository = require("../repositories/authRepository");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Demasiados intentos. Espera unos minutos e intenta de nuevo." },
});

router.post("/login", limiteLogin, asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }

  const user = await authRepository.buscarAdminPorUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const passwordOk = await bcrypt.compare(password, user.password_hash);
  if (!passwordOk) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  req.session.userId = user.id;
  req.session.username = user.username;
  res.json({ username: user.username });
}));

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "No autenticado" });
  }
  res.json({ username: req.session.username });
});

module.exports = router;
