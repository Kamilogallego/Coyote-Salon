// Único lugar del backend que lee process.env directamente. Todo lo demás
// (server.js, db.js, seed-admin.js) importa este módulo en vez de leer
// variables de entorno sueltas por su cuenta.
require("dotenv").config();

// Falla rápido y con un mensaje claro si falta alguna variable obligatoria,
// en vez de que el servidor arranque "bien" y se comporte raro después
// (sesiones que no persisten, conexión a la base que nunca conecta, etc).
// Cada script llama esto solo con lo que realmente necesita.
function requerir(...nombres) {
  const faltantes = nombres.filter((nombre) => !process.env[nombre]);
  if (faltantes.length > 0) {
    console.error(`Faltan variables de entorno: ${faltantes.join(", ")}. Revisa backend/.env.example.`);
    process.exit(1);
  }
}

module.exports = {
  puerto: Number(process.env.PORT) || 3000,
  esProduccion: process.env.NODE_ENV === "production",
  sessionSecret: process.env.SESSION_SECRET,
  // Si DATABASE_URL está presente (Neon/producción) se usa esa; si no, se
  // arma la conexión con las variables sueltas DB_* (Postgres local vía
  // docker-compose).
  databaseUrl: process.env.DATABASE_URL || null,
  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT),
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  requerir,
};
