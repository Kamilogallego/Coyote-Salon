const { Pool } = require("pg");
const env = require("./config/env");

if (!env.databaseUrl) {
  env.requerir("DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME");
}

const pool = env.databaseUrl
  ? new Pool({
      connectionString: env.databaseUrl,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      host: env.dbHost,
      port: env.dbPort,
      user: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
    });

module.exports = pool;
