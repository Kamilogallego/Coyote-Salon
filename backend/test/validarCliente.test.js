const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validar } = require("../utils/validarCliente");

const registroValido = {
  nombre: "Ana Pérez",
  telefono: "+573001234567",
  tipo_documento: "cedula",
  cedula: "1001684563",
  correo: "ana@correo.com",
  pais: "CO",
  ciudad: "Bogotá",
  genero: "femenino",
  fecha_nacimiento: "2000-01-01",
  es_padre: false,
  tiene_pareja: false,
  medio_contacto: "correo",
  mayor_edad: true,
  habeas_data: true,
};

test("validar: acepta un registro completo y válido", () => {
  assert.deepEqual(validar(registroValido), []);
});

test("validar: reporta cada campo obligatorio faltante", () => {
  const errores = validar({});
  assert.ok(errores.length >= 12, "debe reportar al menos los campos obligatorios base");
});

test("validar: rechaza un correo con formato inválido", () => {
  const errores = validar({ ...registroValido, correo: "no-es-un-correo" });
  assert.ok(errores.some((e) => e.includes("Correo")));
});

test("validar: exige confirmar mayoría de edad", () => {
  const errores = validar({ ...registroValido, mayor_edad: false });
  assert.ok(errores.some((e) => e.includes("mayor de edad")));
});

test("validar: exige aceptar el tratamiento de datos", () => {
  const errores = validar({ ...registroValido, habeas_data: false });
  assert.ok(errores.some((e) => e.includes("tratamiento de datos")));
});
