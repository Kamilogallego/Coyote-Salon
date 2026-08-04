const path = require("path");
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const env = require("./config/env");
env.requerir("SESSION_SECRET");

const pool = require("./db");
const authRoutes = require("./routes/auth");
const clientesRoutes = require("./routes/clientes");
const estadisticasRoutes = require("./routes/estadisticas");
const solicitudesRoutes = require("./routes/solicitudes");

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://esm.sh"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        fontSrc: ["'self'", "https://cdn.jsdelivr.net", "data:"],
        imgSrc: ["'self'", "data:", "https://cdn.jsdelivr.net"],
        connectSrc: ["'self'", "https://esm.sh"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'self'"],
      },
    },
  })
);

app.use(express.json());
app.use(
  session({
    store: new pgSession({ pool, tableName: "session", createTableIfMissing: true }),
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.esProduccion,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/estadisticas", estadisticasRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

app.get("/", (req, res) => res.redirect("/coyote/formulario/formulario.html"));

app.use("/coyote", express.static(path.join(__dirname, "..", "coyote")));

app.use("/dashboard", express.static(path.join(__dirname, "..", "dashboard")));

app.use("/propuesta-landing-v2", express.static(path.join(__dirname, "..", "propuesta-landing-v2")));

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ errores: ["Ocurrió un error inesperado. Intenta de nuevo."] });
});

app.listen(env.puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${env.puerto}`);
});

clientesRoutes.purgarPapeleraVencida().catch((err) => console.error("Error al purgar la papelera:", err));
setInterval(() => {
  clientesRoutes.purgarPapeleraVencida().catch((err) => console.error("Error al purgar la papelera:", err));
}, 1000 * 60 * 60);
