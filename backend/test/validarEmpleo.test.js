const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validar } = require("../utils/validarEmpleo");

const registroValido = {
  nombre: "Ana Pérez",
  telefono: "+573001234567",
  correo: "ana@correo.com",
  cargo: "Mesero/a",
  documento_tipo: "cedula",
  documento_numero: "1234567890",
};

test("validar: acepta un registro completo y válido", () => {
  assert.deepEqual(validar(registroValido), []);
});

test("validar: correo es opcional", () => {
  assert.deepEqual(validar({ ...registroValido, correo: "" }), []);
});

test("validar: exige cargo", () => {
  const errores = validar({ ...registroValido, cargo: "" });
  assert.ok(errores.some((e) => e.includes("cargo")));
});

test("validar: rechaza un correo con formato inválido", () => {
  const errores = validar({ ...registroValido, correo: "no-es-un-correo" });
  assert.ok(errores.some((e) => e.includes("Correo")));
});

test("validar: exige tipo y numero de documento", () => {
  const errores = validar({ ...registroValido, documento_tipo: "", documento_numero: "" });
  assert.ok(errores.some((e) => e.includes("documento_tipo")));
  assert.ok(errores.some((e) => e.includes("documento_numero")));
});

test("validar: rechaza un tipo de documento invalido", () => {
  const errores = validar({ ...registroValido, documento_tipo: "libreta_militar" });
  assert.ok(errores.some((e) => e.includes("documento inválido")));
});

test("validar: experiencia es opcional", () => {
  assert.deepEqual(validar({ ...registroValido, experiencia: "" }), []);
});
