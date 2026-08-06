const CAMPOS_REQUERIDOS = ["nombre", "telefono", "tipo_servicio", "portafolio"];

const LONGITUDES_MAXIMAS = {
  nombre: 150,
  telefono: 30,
  correo: 150,
  tipo_servicio: 50,
  portafolio: 300,
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

  return errores;
}

module.exports = { validar, CAMPOS_REQUERIDOS };
