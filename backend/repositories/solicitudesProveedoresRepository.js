const pool = require("../db");

const DIAS_RETENCION_PAPELERA = 30;

async function crear(datos) {
  const { nombre_empresa, contacto, telefono, correo, que_suministra, documento_tipo, documento_numero } = datos;

  const result = await pool.query(
    `INSERT INTO solicitudes_proveedores (nombre_empresa, contacto, telefono, correo, que_suministra, documento_tipo, documento_numero)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING id`,
    [nombre_empresa, contacto, telefono, correo || null, que_suministra, documento_tipo, documento_numero]
  );
  return result.rows[0].id;
}

async function listar() {
  const result = await pool.query(
    `SELECT id, nombre_empresa, contacto, telefono, correo, que_suministra, documento_tipo, documento_numero, fecha_registro
     FROM solicitudes_proveedores
     WHERE eliminado_en IS NULL
     ORDER BY fecha_registro DESC`
  );
  return result.rows;
}

async function obtenerPapelera() {
  const result = await pool.query(
    `SELECT id, nombre_empresa, contacto, telefono, correo, que_suministra, documento_tipo, documento_numero, fecha_registro, eliminado_en
     FROM solicitudes_proveedores
     WHERE eliminado_en IS NOT NULL
     ORDER BY eliminado_en DESC`
  );
  return result.rows;
}

async function eliminar(id) {
  const result = await pool.query(
    "UPDATE solicitudes_proveedores SET eliminado_en = NOW() WHERE id = $1 AND eliminado_en IS NULL RETURNING id",
    [id]
  );
  return result.rows.length > 0;
}

async function restaurar(id) {
  const result = await pool.query(
    "UPDATE solicitudes_proveedores SET eliminado_en = NULL WHERE id = $1 AND eliminado_en IS NOT NULL RETURNING id",
    [id]
  );
  return result.rows.length > 0;
}

async function eliminarDefinitivo(id) {
  const result = await pool.query(
    "DELETE FROM solicitudes_proveedores WHERE id = $1 AND eliminado_en IS NOT NULL RETURNING id",
    [id]
  );
  return result.rows.length > 0;
}

async function purgarVencidos() {
  await pool.query(
    `DELETE FROM solicitudes_proveedores WHERE eliminado_en IS NOT NULL AND eliminado_en < NOW() - INTERVAL '${DIAS_RETENCION_PAPELERA} days'`
  );
}

module.exports = {
  DIAS_RETENCION_PAPELERA,
  crear,
  listar,
  obtenerPapelera,
  eliminar,
  restaurar,
  eliminarDefinitivo,
  purgarVencidos,
};
