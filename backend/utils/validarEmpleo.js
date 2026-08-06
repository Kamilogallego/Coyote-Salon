const CAMPOS_REQUERIDOS = ["nombre", "telefono", "cargo", "documento_tipo", "documento_numero"];

const TIPOS_DOCUMENTO_VALIDOS = ["cedula", "cedula_extranjeria", "pasaporte"];

const LONGITUDES_MAXIMAS = {
  nombre: 150,
  telefono: 30,
  correo: 150,
  cargo: 50,
  documento_tipo: 30,
  documento_numero: 30,
  experiencia: 2000,
};

function validar(body) {
  const errores = [];

  for (const campo of CAMPOS_REQUERIDOS) {
    const valor = body[campo];
    if (typeof valor !== "string" || valor.trim() === "") {
      errores.push(`El campo "${campo}" es obligatorio`);
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

  if (body.correo && typeof body.correo === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.correo)) {
    errores.push("Correo electrónico inválido");
  }

  if (body.documento_tipo && !TIPOS_DOCUMENTO_VALIDOS.includes(body.documento_tipo)) {
    errores.push("Tipo de documento inválido");
  }

  return errores;
}

module.exports = { validar, CAMPOS_REQUERIDOS };
