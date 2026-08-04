const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validar } = require("../utils/validarArtista");

const registroValido = {
  nombre: "DJ Coyote",
  telefono: "+573001234567",
  correo: "dj@correo.com",
  tipo_servicio: "DJ",
  portafolio: "https://instagram.com/djcoyote",
};

test("validar: acepta un registro completo y válido", () => {
  assert.deepEqual(validar(registroValido), []);
});

test("validar: correo es opcional", () => {
  assert.deepEqual(validar({ ...registroValido, correo: "" }), []);
});

test("validar: exige portafolio", () => {
  const errores = validar({ ...registroValido, portafolio: "" });
  assert.ok(errores.some((e) => e.includes("portafolio")));
});

test("validar: rechaza un correo con formato inválido", () => {
  const errores = validar({ ...registroValido, correo: "no-es-un-correo" });
  assert.ok(errores.some((e) => e.includes("Correo")));
});

test("validar: rechaza un campo que supera la longitud máxima de su columna", () => {
  const errores = validar({ ...registroValido, nombre: "a".repeat(151) });
  assert.ok(errores.some((e) => e.includes("nombre") && e.includes("150")));
});
