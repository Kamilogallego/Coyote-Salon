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
  "medio_contacto",
];

const CAMPOS_BOOLEANOS = ["es_padre", "tiene_pareja", "mayor_edad", "habeas_data"];

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
    if (typeof valor !== "string" || valor.trim() === "") {
      errores.push(`El campo "${campo}" es obligatorio`);
    }
  }

  for (const campo of CAMPOS_BOOLEANOS) {
    if (typeof body[campo] !== "boolean") {
      errores.push(`El campo "${campo}" tiene un formato inválido`);
    }
  }

  for (const [campo, maximo] of Object.entries(LONGITUDES_MAXIMAS)) {
    const valor = body[campo];
    if (valor !== undefined && typeof valor !== "string") {
      errores.push(`El campo "${campo}" tiene un formato inválido`);
    } else if (typeof valor === "string" && valor.length > maximo) {
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
