const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validar } = require("../utils/validarSolicitud");

const artistaValido = {
  tipo: "artista",
  nombre: "DJ Coyote",
  telefono: "+573001234567",
  correo: "dj@correo.com",
  categoria: "DJ",
  portafolio: "https://instagram.com/djcoyote",
};

const empleoValido = {
  tipo: "empleo",
  nombre: "Ana Pérez",
  telefono: "+573001234567",
  categoria: "Bartender",
};

const proveedorValido = {
  tipo: "proveedor",
  nombre: "Licores del Valle",
  contacto: "Carlos Ruiz",
  telefono: "+573001234567",
  categoria: "Licores",
};

test("validar: acepta una solicitud de artista completa y válida", () => {
  assert.deepEqual(validar(artistaValido), []);
});

test("validar: acepta una solicitud de empleo completa y válida", () => {
  assert.deepEqual(validar(empleoValido), []);
});

test("validar: acepta una solicitud de proveedor completa y válida", () => {
  assert.deepEqual(validar(proveedorValido), []);
});

test("validar: rechaza un tipo inválido", () => {
  const errores = validar({ ...empleoValido, tipo: "otro" });
  assert.ok(errores.some((e) => e.includes("tipo")));
});

test("validar: exige portafolio solo para artistas", () => {
  const errores = validar({ ...artistaValido, portafolio: "" });
  assert.ok(errores.some((e) => e.includes("portafolio")));
});

test("validar: exige contacto solo para proveedores", () => {
  const errores = validar({ ...proveedorValido, contacto: "" });
  assert.ok(errores.some((e) => e.includes("contacto")));
});

test("validar: correo es opcional pero valida el formato si viene", () => {
  const errores = validar({ ...empleoValido, correo: "no-es-un-correo" });
  assert.ok(errores.some((e) => e.includes("Correo")));
});

test("validar: rechaza un campo que supera la longitud máxima de su columna", () => {
  const errores = validar({ ...empleoValido, nombre: "a".repeat(151) });
  assert.ok(errores.some((e) => e.includes("nombre") && e.includes("150")));
});
