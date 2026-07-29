const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const CAMPOS_REQUERIDOS = [
  "nombre",
  "telefono",
  "tipo_documento",
  "cedula",
  "correo",
  "pais",
  "ciudad",
  "genero",
  "fecha_nacimiento",
  "es_padre",
  "tiene_pareja",
  "medio_contacto",
  "mayor_edad",
  "habeas_data",
];

function validar(body) {
  const errores = [];

  for (const campo of CAMPOS_REQUERIDOS) {
    const valor = body[campo];
    if (valor === undefined || valor === null || valor === "") {
      errores.push(`El campo "${campo}" es obligatorio`);
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.correo || "")) {
    errores.push("Correo electrónico inválido");
  }

  if (body.mayor_edad !== true) {
    errores.push("Debe confirmar que es mayor de edad");
  }

  if (body.habeas_data !== true) {
    errores.push("Debe aceptar el tratamiento de datos personales");
  }

  return errores;
}

// POST /api/clientes - registro público desde el formulario
router.post("/", async (req, res) => {
  const errores = validar(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

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
  } = req.body;

  try {
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
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ errores: ["Ya existe un registro con ese tipo y número de documento"] });
    }
    console.error(err);
    res.status(500).json({ errores: ["Error interno al guardar el registro"] });
  }
});

// GET /api/clientes - listado para el dashboard (requiere sesión)
router.get("/", requireAuth, async (req, res) => {
  const {
    genero,
    pais,
    ciudad,
    medio_contacto,
    es_padre,
    tiene_pareja,
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
  } = req.query;
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
  const where = `WHERE ${condiciones.join(" AND ")}`;

  const result = await pool.query(
    `SELECT id, nombre, telefono, tipo_documento, cedula, correo, pais, ciudad, genero,
            fecha_nacimiento, es_padre, tiene_pareja, fecha_aniversario, medio_contacto,
            recibir_novedades, puntos, fecha_registro
     FROM clientes
     ${where}
     ORDER BY fecha_registro DESC`,
    valores
  );

  res.json(result.rows);
});

const DIAS_RETENCION_PAPELERA = 30;

async function purgarPapeleraVencida() {
  await pool.query(
    `DELETE FROM clientes WHERE eliminado_en IS NOT NULL AND eliminado_en < NOW() - INTERVAL '${DIAS_RETENCION_PAPELERA} days'`
  );
}

// GET /api/clientes/papelera - clientes eliminados, pendientes de purga (requiere sesión)
router.get("/papelera", requireAuth, async (req, res) => {
  await purgarPapeleraVencida();

  const result = await pool.query(
    `SELECT id, nombre, telefono, tipo_documento, cedula, correo, pais, ciudad, genero,
            fecha_nacimiento, es_padre, tiene_pareja, fecha_aniversario, medio_contacto,
            recibir_novedades, puntos, fecha_registro, eliminado_en
     FROM clientes
     WHERE eliminado_en IS NOT NULL
     ORDER BY eliminado_en DESC`
  );

  res.json({ dias_retencion: DIAS_RETENCION_PAPELERA, clientes: result.rows });
});

// POST /api/clientes/eliminar-multiple - mover varios a la papelera a la vez (requiere sesión)
router.post("/eliminar-multiple", requireAuth, async (req, res) => {
  const ids = Array.isArray(req.body.ids) ? req.body.ids.map(Number).filter(Number.isInteger) : [];
  if (ids.length === 0) {
    return res.status(400).json({ errores: ["No se recibieron clientes para eliminar"] });
  }

  const result = await pool.query(
    "UPDATE clientes SET eliminado_en = NOW() WHERE id = ANY($1) AND eliminado_en IS NULL RETURNING id",
    [ids]
  );
  res.json({ ok: true, eliminados: result.rows.length, dias_retencion: DIAS_RETENCION_PAPELERA });
});

// DELETE /api/clientes/:id - mover a la papelera (requiere sesión)
router.delete("/:id", requireAuth, async (req, res) => {
  const result = await pool.query(
    "UPDATE clientes SET eliminado_en = NOW() WHERE id = $1 AND eliminado_en IS NULL RETURNING id",
    [req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ errores: ["Cliente no encontrado"] });
  }
  res.json({ ok: true, dias_retencion: DIAS_RETENCION_PAPELERA });
});

// POST /api/clientes/:id/restaurar - sacar de la papelera (requiere sesión)
router.post("/:id/restaurar", requireAuth, async (req, res) => {
  const result = await pool.query(
    "UPDATE clientes SET eliminado_en = NULL WHERE id = $1 AND eliminado_en IS NOT NULL RETURNING id",
    [req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ errores: ["Cliente no encontrado en la papelera"] });
  }
  res.json({ ok: true });
});

// DELETE /api/clientes/:id/definitivo - eliminar permanentemente desde la papelera (requiere sesión)
router.delete("/:id/definitivo", requireAuth, async (req, res) => {
  const result = await pool.query(
    "DELETE FROM clientes WHERE id = $1 AND eliminado_en IS NOT NULL RETURNING id",
    [req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ errores: ["Cliente no encontrado en la papelera"] });
  }
  res.json({ ok: true });
});

module.exports = router;
module.exports.purgarPapeleraVencida = purgarPapeleraVencida;
