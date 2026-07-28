const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const [
    total,
    nuevosEsteMes,
    conPareja,
    conHijos,
    genero,
    medioContacto,
    rangoEdad,
    crecimientoMensual,
    ultimosClientes,
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
    pool.query(
      `SELECT id, nombre, medio_contacto, fecha_registro
       FROM clientes
       WHERE eliminado_en IS NULL
       ORDER BY fecha_registro DESC
       LIMIT 5`
    ),
  ]);

  res.json({
    total: total.rows[0].total,
    nuevosEsteMes: nuevosEsteMes.rows[0].total,
    conPareja: conPareja.rows[0].total,
    conHijos: conHijos.rows[0].total,
    genero: genero.rows,
    medioContacto: medioContacto.rows,
    rangoEdad: rangoEdad.rows,
    crecimientoMensual: crecimientoMensual.rows,
    ultimosClientes: ultimosClientes.rows,
  });
});

module.exports = router;
