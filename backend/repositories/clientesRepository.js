const pool = require("../db");

const DIAS_RETENCION_PAPELERA = 30;

async function crear(datos) {
  const {
    nombre,
    telefono,
    tipo_documento,
    cedula,
    correo,
    pais,
    ciudad,
    genero,
    fecha_nacimiento,
    es_padre,
    tiene_pareja,
    fecha_aniversario,
    medio_contacto,
    mayor_edad,
    habeas_data,
    recibir_novedades,
  } = datos;

  const result = await pool.query(
    `INSERT INTO clientes
      (nombre, telefono, tipo_documento, cedula, correo, pais, ciudad, genero,
       fecha_nacimiento, es_padre, tiene_pareja, fecha_aniversario, medio_contacto,
       mayor_edad, habeas_data, recibir_novedades)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING id`,
    [
      nombre,
      telefono,
      tipo_documento,
      cedula,
      correo,
      pais,
      ciudad,
      genero,
      fecha_nacimiento,
      es_padre === true,
      tiene_pareja === true,
      fecha_aniversario || null,
      medio_contacto,
      mayor_edad === true,
      habeas_data === true,
      recibir_novedades === true,
    ]
  );
  return result.rows[0].id;
}

function construirFiltros(query) {
  const {
    genero,
    pais,
    ciudad,
    medio_contacto,
    es_padre,
    tiene_pareja,
    recibir_novedades,
    edad_min,
    edad_max,
    nombre,
    telefono,
    tipo_documento,
    cedula,
    aniversario_desde,
    aniversario_hasta,
    registrado_desde,
    registrado_hasta,
    busqueda,
  } = query;
  const condiciones = [];
  const valores = [];

  if (busqueda) {
    valores.push(`%${busqueda.replace(/[^0-9A-Za-zÀ-ÿ\s]/g, "")}%`);
    condiciones.push(
      `(nombre ILIKE $${valores.length} OR telefono ILIKE $${valores.length} OR cedula ILIKE $${valores.length})`
    );
  }
  if (nombre) {
    valores.push(`%${nombre}%`);
    condiciones.push(`nombre ILIKE $${valores.length}`);
  }
  if (telefono) {
    valores.push(`%${telefono.replace(/[^0-9+]/g, "")}%`);
    condiciones.push(`telefono ILIKE $${valores.length}`);
  }
  if (tipo_documento) {
    valores.push(tipo_documento);
    condiciones.push(`tipo_documento = $${valores.length}`);
  }
  if (cedula) {
    valores.push(`%${cedula}%`);
    condiciones.push(`cedula ILIKE $${valores.length}`);
  }
  if (aniversario_desde) {
    valores.push(aniversario_desde);
    condiciones.push(`fecha_aniversario >= $${valores.length}`);
  }
  if (aniversario_hasta) {
    valores.push(aniversario_hasta);
    condiciones.push(`fecha_aniversario <= $${valores.length}`);
  }
  if (ciudad) {
    valores.push(`%${ciudad}%`);
    condiciones.push(
      `translate(lower(ciudad), 'áéíóúñ', 'aeioun') ILIKE translate(lower($${valores.length}), 'áéíóúñ', 'aeioun')`
    );
  }
  if (genero) {
    valores.push(genero);
    condiciones.push(`genero = $${valores.length}`);
  }
  if (pais) {
    valores.push(pais);
    condiciones.push(`pais = $${valores.length}`);
  }
  if (medio_contacto) {
    valores.push(medio_contacto);
    condiciones.push(`medio_contacto = $${valores.length}`);
  }
  if (es_padre === "si" || es_padre === "no") {
    valores.push(es_padre === "si");
    condiciones.push(`es_padre = $${valores.length}`);
  }
  if (tiene_pareja === "si" || tiene_pareja === "no") {
    valores.push(tiene_pareja === "si");
    condiciones.push(`tiene_pareja = $${valores.length}`);
  }
  if (recibir_novedades === "si" || recibir_novedades === "no") {
    valores.push(recibir_novedades === "si");
    condiciones.push(`recibir_novedades = $${valores.length}`);
  }
  if (edad_min !== undefined && edad_min !== "" && !Number.isNaN(Number(edad_min))) {
    valores.push(Number(edad_min));
    condiciones.push(`DATE_PART('year', AGE(fecha_nacimiento)) >= $${valores.length}`);
  }
  if (edad_max !== undefined && edad_max !== "" && !Number.isNaN(Number(edad_max))) {
    valores.push(Number(edad_max));
    condiciones.push(`DATE_PART('year', AGE(fecha_nacimiento)) <= $${valores.length}`);
  }
  if (registrado_desde) {
    valores.push(registrado_desde);
    condiciones.push(`fecha_registro >= $${valores.length}`);
  }
  if (registrado_hasta) {
    valores.push(registrado_hasta);
    condiciones.push(`fecha_registro < ($${valores.length}::date + interval '1 day')`);
  }

  condiciones.push("eliminado_en IS NULL");
  return { where: `WHERE ${condiciones.join(" AND ")}`, valores };
}

async function listar(query) {
  const { where, valores } = construirFiltros(query);
  const result = await pool.query(
    `SELECT id, nombre, telefono, tipo_documento, cedula, correo, pais, ciudad, genero,
            fecha_nacimiento, es_padre, tiene_pareja, fecha_aniversario, medio_contacto,
            recibir_novedades, puntos, fecha_registro
     FROM clientes
     ${where}
     ORDER BY fecha_registro DESC`,
    valores
  );
  return result.rows;
}

async function obtenerPapelera() {
  const result = await pool.query(
    `SELECT id, nombre, telefono, tipo_documento, cedula, correo, pais, ciudad, genero,
            fecha_nacimiento, es_padre, tiene_pareja, fecha_aniversario, medio_contacto,
            recibir_novedades, puntos, fecha_registro, eliminado_en
     FROM clientes
     WHERE eliminado_en IS NOT NULL
     ORDER BY eliminado_en DESC`
  );
  return result.rows;
}

async function eliminarMultiple(ids) {
  const result = await pool.query(
    "UPDATE clientes SET eliminado_en = NOW() WHERE id = ANY($1) AND eliminado_en IS NULL RETURNING id",
    [ids]
  );
  return result.rows.length;
}

async function eliminarUno(id) {
  const result = await pool.query(
    "UPDATE clientes SET eliminado_en = NOW() WHERE id = $1 AND eliminado_en IS NULL RETURNING id",
    [id]
  );
  return result.rows.length > 0;
}

async function restaurar(id) {
  const result = await pool.query(
    "UPDATE clientes SET eliminado_en = NULL WHERE id = $1 AND eliminado_en IS NOT NULL RETURNING id",
    [id]
  );
  return result.rows.length > 0;
}

async function restaurarMultiple(ids) {
  const result = await pool.query(
    "UPDATE clientes SET eliminado_en = NULL WHERE id = ANY($1) AND eliminado_en IS NOT NULL RETURNING id",
    [ids]
  );
  return result.rows.length;
}

async function eliminarDefinitivo(id) {
  const result = await pool.query(
    "DELETE FROM clientes WHERE id = $1 AND eliminado_en IS NOT NULL RETURNING id",
    [id]
  );
  return result.rows.length > 0;
}

async function eliminarDefinitivoMultiple(ids) {
  const result = await pool.query(
    "DELETE FROM clientes WHERE id = ANY($1) AND eliminado_en IS NOT NULL RETURNING id",
    [ids]
  );
  return result.rows.length;
}

async function purgarVencidos() {
  await pool.query(
    `DELETE FROM clientes WHERE eliminado_en IS NOT NULL AND eliminado_en < NOW() - INTERVAL '${DIAS_RETENCION_PAPELERA} days'`
  );
}

module.exports = {
  DIAS_RETENCION_PAPELERA,
  crear,
  listar,
  obtenerPapelera,
  eliminarMultiple,
  eliminarUno,
  restaurar,
  restaurarMultiple,
  eliminarDefinitivo,
  eliminarDefinitivoMultiple,
  purgarVencidos,
};
