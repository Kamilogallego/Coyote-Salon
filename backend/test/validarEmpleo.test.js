const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validar } = require("../utils/validarEmpleo");

const registroValido = {
  nombre: "Ana Pérez",
  telefono: "+573001234567",
  correo: "ana@correo.com",
  cargo: "Bartender",
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
