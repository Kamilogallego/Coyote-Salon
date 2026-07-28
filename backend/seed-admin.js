require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("./db");

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error("Falta ADMIN_USERNAME o ADMIN_PASSWORD en .env");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [username, hash]
  );

  console.log(`Usuario admin "${username}" creado/actualizado.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
