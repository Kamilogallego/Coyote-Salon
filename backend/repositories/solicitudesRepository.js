const pool = require("../db");

async function crear(datos) {
  const { tipo, nombre, contacto, telefono, correo, categoria, portafolio } = datos;

  const result = await pool.query(
    `INSERT INTO solicitudes (tipo, nombre, contacto, telefono, correo, categoria, portafolio)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING id`,
    [tipo, nombre, contacto || null, telefono, correo || null, categoria, portafolio || null]
  );
  return result.rows[0].id;
}

async function listar(query) {
  const { tipo } = query;

  if (tipo) {
    const result = await pool.query(
      `SELECT id, tipo, nombre, contacto, telefono, correo, categoria, portafolio, fecha_registro
       FROM solicitudes
       WHERE tipo = $1
       ORDER BY fecha_registro DESC`,
      [tipo]
    );
    return result.rows;
  }

  const result = await pool.query(
    `SELECT id, tipo, nombre, contacto, telefono, correo, categoria, portafolio, fecha_registro
     FROM solicitudes
     ORDER BY fecha_registro DESC`
  );
  return result.rows;
}

async function eliminar(id) {
  const result = await pool.query("DELETE FROM solicitudes WHERE id = $1 RETURNING id", [id]);
  return result.rows.length > 0;
}

module.exports = { crear, listar, eliminar };
