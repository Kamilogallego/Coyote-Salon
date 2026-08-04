const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validar } = require("../utils/validarProveedor");

const registroValido = {
  nombre_empresa: "Licores del Valle",
  contacto: "Carlos Ruiz",
  telefono: "+573001234567",
  correo: "ventas@licoresdelvalle.com",
  que_suministra: "Licores",
};

test("validar: acepta un registro completo y válido", () => {
  assert.deepEqual(validar(registroValido), []);
});

test("validar: correo es opcional", () => {
  assert.deepEqual(validar({ ...registroValido, correo: "" }), []);
});

test("validar: exige contacto", () => {
  const errores = validar({ ...registroValido, contacto: "" });
  assert.ok(errores.some((e) => e.includes("contacto")));
});

test("validar: rechaza un correo con formato inválido", () => {
  const errores = validar({ ...registroValido, correo: "no-es-un-correo" });
  assert.ok(errores.some((e) => e.includes("Correo")));
});
