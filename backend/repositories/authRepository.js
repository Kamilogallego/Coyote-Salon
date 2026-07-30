const pool = require("../db");

async function buscarAdminPorUsername(username) {
  const result = await pool.query(
    "SELECT id, username, password_hash FROM admin_users WHERE username = $1",
    [username]
  );
  return result.rows[0] || null;
}

module.exports = { buscarAdminPorUsername };
