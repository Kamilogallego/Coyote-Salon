const pool = require("../db");

async function crear(datos) {
  const { nombre, telefono, correo, tipo_servicio, portafolio } = datos;

  const result = await pool.query(
    `INSERT INTO solicitudes_artistas (nombre, telefono, correo, tipo_servicio, portafolio)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id`,
    [nombre, telefono, correo || null, tipo_servicio, portafolio]
  );
  return result.rows[0].id;
}

async function listar() {
  const result = await pool.query(
    `SELECT id, nombre, telefono, correo, tipo_servicio, portafolio, fecha_registro
     FROM solicitudes_artistas
     ORDER BY fecha_registro DESC`
  );
  return result.rows;
}

async function eliminar(id) {
  const result = await pool.query("DELETE FROM solicitudes_artistas WHERE id = $1 RETURNING id", [id]);
  return result.rows.length > 0;
}

module.exports = { crear, listar, eliminar };
