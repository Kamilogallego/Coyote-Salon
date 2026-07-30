// Aplica backend/schema.sql a la base de datos configurada en .env (local o
// Neon vía DATABASE_URL). CREATE TABLE/INDEX usan IF NOT EXISTS y las
// restricciones se agregan dentro de un bloque DO idempotente, así que
// correr esto varias veces es seguro. Si ya existen datos duplicados en
// cedula/correo/telefono, la migración falla con un error claro de
// Postgres en vez de aplicarse a medias (todo corre dentro de una
// transacción).
const fs = require("fs");
const path = require("path");
const pool = require("./db");

async function main() {
  const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");
    console.log("Esquema aplicado correctamente.");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
