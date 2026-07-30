const bcrypt = require("bcrypt");
const env = require("./config/env");

env.requerir("ADMIN_USERNAME", "ADMIN_PASSWORD");

const pool = require("./db");

async function main() {
  const hash = await bcrypt.hash(env.adminPassword, 10);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [env.adminUsername, hash]
  );

  console.log(`Usuario admin "${env.adminUsername}" creado/actualizado.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
