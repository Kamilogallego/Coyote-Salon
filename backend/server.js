require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const pool = require("./db");
const authRoutes = require("./routes/auth");
const clientesRoutes = require("./routes/clientes");
const estadisticasRoutes = require("./routes/estadisticas");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

// Necesario en Render (y cualquier PaaS detrás de proxy) para que las cookies
// "secure" funcionen: Express debe confiar en el header X-Forwarded-Proto.
app.set("trust proxy", 1);

app.use(express.json());
app.use(
  session({
    store: new pgSession({ pool, tableName: "session", createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/estadisticas", estadisticasRoutes);

app.get("/", (req, res) => res.redirect("/coyote/formulario/formulario.html"));

// Formulario público
app.use("/coyote", express.static(path.join(__dirname, "..", "coyote")));

// Dashboard (la protección real es a nivel de API; estos archivos son solo la UI)
app.use("/dashboard", express.static(path.join(__dirname, "..", "dashboard")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Purga automática de la papelera (clientes eliminados hace más de 30 días)
clientesRoutes.purgarPapeleraVencida().catch((err) => console.error("Error al purgar la papelera:", err));
setInterval(() => {
  clientesRoutes.purgarPapeleraVencida().catch((err) => console.error("Error al purgar la papelera:", err));
}, 1000 * 60 * 60);
