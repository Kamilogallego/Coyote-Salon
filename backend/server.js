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

const app = express();

// Necesario en Render (y cualquier PaaS detrás de proxy) para que las cookies
// "secure" funcionen: Express debe confiar en el header X-Forwarded-Proto.
app.set("trust proxy", 1);

// Cabeceras de seguridad (X-Content-Type-Options, X-Frame-Options, etc).
// La CSP lista explícitamente los CDN que el formulario público y el
// dashboard ya usan (intl-tel-input, qrcode-generator, xlsx vía esm.sh);
// todo lo demás solo puede cargar desde el propio origen.
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

// Manejador de errores central: cualquier error que llegue hasta aquí (los
// route handlers async usan asyncHandler para reenviar sus rechazos con
// next(err)) se loguea del lado del servidor y responde con un 500 limpio,
// en vez de dejar el request colgado o tumbar el proceso.
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ errores: ["Ocurrió un error inesperado. Intenta de nuevo."] });
});

app.listen(env.puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${env.puerto}`);
});

// Purga automática de la papelera (clientes eliminados hace más de 30 días)
clientesRoutes.purgarPapeleraVencida().catch((err) => console.error("Error al purgar la papelera:", err));
setInterval(() => {
  clientesRoutes.purgarPapeleraVencida().catch((err) => console.error("Error al purgar la papelera:", err));
}, 1000 * 60 * 60);
