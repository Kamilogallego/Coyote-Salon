const TIPOS_VALIDOS = ["artista", "empleo", "proveedor"];

const CAMPOS_REQUERIDOS = ["nombre", "telefono", "categoria"];

const LONGITUDES_MAXIMAS = {
  nombre: 150,
  contacto: 150,
  telefono: 30,
  correo: 150,
  categoria: 50,
  portafolio: 300,
};

function validar(body) {
  const errores = [];

  if (!TIPOS_VALIDOS.includes(body.tipo)) {
    errores.push('El campo "tipo" debe ser "artista", "empleo" o "proveedor"');
    return errores;
  }

  for (const campo of CAMPOS_REQUERIDOS) {
    const valor = body[campo];
    if (valor === undefined || valor === null || valor === "") {
      errores.push(`El campo "${campo}" es obligatorio`);
    }
  }

  if (body.tipo === "artista" && !body.portafolio) {
    errores.push('El campo "portafolio" es obligatorio');
  }

  if (body.tipo === "proveedor" && !body.contacto) {
    errores.push('El campo "contacto" es obligatorio');
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

module.exports = { validar, TIPOS_VALIDOS };
