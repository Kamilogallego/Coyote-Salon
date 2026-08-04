const pool = require("../db");

async function crear(datos) {
  const { nombre_empresa, contacto, telefono, correo, que_suministra } = datos;

  const result = await pool.query(
    `INSERT INTO solicitudes_proveedores (nombre_empresa, contacto, telefono, correo, que_suministra)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id`,
    [nombre_empresa, contacto, telefono, correo || null, que_suministra]
  );
  return result.rows[0].id;
}

async function listar() {
  const result = await pool.query(
    `SELECT id, nombre_empresa, contacto, telefono, correo, que_suministra, fecha_registro
     FROM solicitudes_proveedores
     ORDER BY fecha_registro DESC`
  );
  return result.rows;
}

async function eliminar(id) {
  const result = await pool.query("DELETE FROM solicitudes_proveedores WHERE id = $1 RETURNING id", [id]);
  return result.rows.length > 0;
}

module.exports = { crear, listar, eliminar };
