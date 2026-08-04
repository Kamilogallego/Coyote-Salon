const CAMPOS_REQUERIDOS = ["nombre", "telefono", "cargo"];

const LONGITUDES_MAXIMAS = {
  nombre: 150,
  telefono: 30,
  correo: 150,
  cargo: 50,
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

  if (body.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.correo)) {
    errores.push("Correo electrónico inválido");
  }

  return errores;
}

module.exports = { validar, CAMPOS_REQUERIDOS };
