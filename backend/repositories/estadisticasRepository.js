const pool = require("../db");

function sqlProximaFecha(columnaFecha, condicionExtra = "") {
  return `
    WITH base AS (
      SELECT id, nombre, ${columnaFecha} AS fecha,
        EXTRACT(MONTH FROM ${columnaFecha})::int AS mes,
        EXTRACT(DAY FROM ${columnaFecha})::int AS dia
      FROM clientes
      WHERE eliminado_en IS NULL AND ${columnaFecha} IS NOT NULL ${condicionExtra}
    ),
    candidatos AS (
      SELECT id, nombre, fecha,
        (make_date(EXTRACT(YEAR FROM CURRENT_DATE)::int, mes, 1) + (dia - 1) * INTERVAL '1 day')::date AS este_anio
      FROM base
    )
    SELECT id, nombre, fecha,
      (CASE WHEN este_anio >= CURRENT_DATE THEN este_anio ELSE (este_anio + INTERVAL '1 year')::date END) AS proxima_fecha,
      ((CASE WHEN este_anio >= CURRENT_DATE THEN este_anio ELSE (este_anio + INTERVAL '1 year')::date END) - CURRENT_DATE)::int AS dias_faltantes
    FROM candidatos
    ORDER BY dias_faltantes ASC
    LIMIT 10
  `;
}

async function obtener() {
  const [
    total,
    nuevosEsteMes,
    conPareja,
    conHijos,
    genero,
    medioContacto,
    rangoEdad,
    crecimientoMensual,
    proximosCumpleanos,
    proximosAniversarios,
    sinNovedadesTotal,
    sinNovedadesPorMedio,
  ] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS total FROM clientes WHERE eliminado_en IS NULL"),
    pool.query(
      `SELECT COUNT(*)::int AS total FROM clientes
       WHERE eliminado_en IS NULL
         AND date_trunc('month', fecha_registro) = date_trunc('month', now())`
    ),
    pool.query("SELECT COUNT(*)::int AS total FROM clientes WHERE eliminado_en IS NULL AND tiene_pareja = true"),
    pool.query("SELECT COUNT(*)::int AS total FROM clientes WHERE eliminado_en IS NULL AND es_padre = true"),
    pool.query(
      `SELECT genero, COUNT(*)::int AS cantidad FROM clientes WHERE eliminado_en IS NULL GROUP BY genero ORDER BY cantidad DESC`
    ),
    pool.query(
      `SELECT medio_contacto, COUNT(*)::int AS cantidad FROM clientes WHERE eliminado_en IS NULL GROUP BY medio_contacto ORDER BY cantidad DESC`
    ),
    pool.query(
      `SELECT rango, COUNT(*)::int AS cantidad FROM (
         SELECT CASE
           WHEN edad BETWEEN 18 AND 24 THEN '18-24'
           WHEN edad BETWEEN 25 AND 34 THEN '25-34'
           WHEN edad BETWEEN 35 AND 44 THEN '35-44'
           WHEN edad BETWEEN 45 AND 54 THEN '45-54'
           WHEN edad BETWEEN 55 AND 64 THEN '55-64'
           ELSE '65+'
         END AS rango
         FROM (SELECT DATE_PART('year', AGE(fecha_nacimiento))::int AS edad FROM clientes WHERE eliminado_en IS NULL) sub
       ) agrupado
       GROUP BY rango
       ORDER BY rango`
    ),
    pool.query(
      `SELECT to_char(fecha_registro, 'YYYY-MM') AS mes, COUNT(*)::int AS cantidad
       FROM clientes
       WHERE eliminado_en IS NULL AND fecha_registro >= now() - interval '6 months'
       GROUP BY mes
       ORDER BY mes`
    ),
    pool.query(sqlProximaFecha("fecha_nacimiento")),
    pool.query(sqlProximaFecha("fecha_aniversario", "AND tiene_pareja = true")),
    pool.query(
      "SELECT COUNT(*)::int AS total FROM clientes WHERE eliminado_en IS NULL AND recibir_novedades = false"
    ),
    pool.query(
      `SELECT medio_contacto, COUNT(*)::int AS cantidad FROM clientes
       WHERE eliminado_en IS NULL AND recibir_novedades = false
       GROUP BY medio_contacto ORDER BY cantidad DESC`
    ),
  ]);

  return {
    total: total.rows[0].total,
    nuevosEsteMes: nuevosEsteMes.rows[0].total,
    conPareja: conPareja.rows[0].total,
    conHijos: conHijos.rows[0].total,
    genero: genero.rows,
    medioContacto: medioContacto.rows,
    rangoEdad: rangoEdad.rows,
    crecimientoMensual: crecimientoMensual.rows,
    proximosCumpleanos: proximosCumpleanos.rows,
    proximosAniversarios: proximosAniversarios.rows,
    sinNovedadesTotal: sinNovedadesTotal.rows[0].total,
    sinNovedadesPorMedio: sinNovedadesPorMedio.rows,
  };
}

module.exports = { obtener };
