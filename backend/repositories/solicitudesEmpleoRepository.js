const pool = require("../db");

async function crear(datos) {
  const { nombre, telefono, correo, cargo } = datos;

  const result = await pool.query(
    `INSERT INTO solicitudes_empleo (nombre, telefono, correo, cargo)
     VALUES ($1,$2,$3,$4)
     RETURNING id`,
    [nombre, telefono, correo || null, cargo]
  );
  return result.rows[0].id;
}

async function listar() {
  const result = await pool.query(
    `SELECT id, nombre, telefono, correo, cargo, fecha_registro
     FROM solicitudes_empleo
     ORDER BY fecha_registro DESC`
  );
  return result.rows;
}

async function eliminar(id) {
  const result = await pool.query("DELETE FROM solicitudes_empleo WHERE id = $1 RETURNING id", [id]);
  return result.rows.length > 0;
}

module.exports = { crear, listar, eliminar };
