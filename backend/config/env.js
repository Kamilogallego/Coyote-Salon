require("dotenv").config();

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
