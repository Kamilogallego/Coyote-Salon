require("dotenv").config();
const { Pool } = require("pg");

// En Render/Neon se usa DATABASE_URL (requiere SSL). En local (Docker) se usan
// las variables sueltas DB_HOST/DB_PORT/etc, sin SSL.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

module.exports = pool;
