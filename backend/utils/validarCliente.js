// Validación del registro público de clientes. Módulo puro (sin DB, sin
// Express) para poder probarlo directo y para que routes/clientes.js no
// mezcle validación con manejo de la petición HTTP.
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

// Debe calzar con los VARCHAR de schema.sql: sin este chequeo, un valor más
// largo que la columna llega hasta Postgres y responde con un 500 crudo en
// vez de un error de validación claro.
const LONGITUDES_MAXIMAS = {
  nombre: 150,
  telefono: 30,
  tipo_documento: 30,
  cedula: 20,
  correo: 150,
  pais: 5,
  ciudad: 100,
  genero: 20,
  medio_contacto: 20,
};

function validar(body) {
  const errores = [];

  for (const campo of CAMPOS_REQUERIDOS) {
    const valor = body[campo];
    if (valor === undefined || valor === null || valor === "") {
      errores.push(`El campo "${campo}" es obligatorio`);
    }
  }

  for (const [campo, maximo] of Object.entries(LONGITUDES_MAXIMAS)) {
    const valor = body[campo];
    if (typeof valor === "string" && valor.length > maximo) {
      errores.push(`El campo "${campo}" no puede superar ${maximo} caracteres`);
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

module.exports = { validar, CAMPOS_REQUERIDOS };
