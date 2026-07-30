const { test } = require("node:test");
const assert = require("node:assert/strict");
const { tieneCampoTrampaLleno, seEnvioMuyRapido, TIEMPO_MINIMO_MS } = require("../utils/antiBot");

test("tieneCampoTrampaLleno: detecta el campo trampa lleno", () => {
  assert.equal(tieneCampoTrampaLleno({ sitio_web: "http://spam.com" }), true);
});

test("tieneCampoTrampaLleno: pasa si el campo trampa está vacío", () => {
  assert.equal(tieneCampoTrampaLleno({ sitio_web: "" }), false);
  assert.equal(tieneCampoTrampaLleno({}), false);
});

test("seEnvioMuyRapido: rechaza un envío instantáneo", () => {
  assert.equal(seEnvioMuyRapido({ iniciado_en: Date.now() }), true);
});

test("seEnvioMuyRapido: rechaza si falta iniciado_en", () => {
  assert.equal(seEnvioMuyRapido({}), true);
});

test("seEnvioMuyRapido: acepta un envío después del tiempo mínimo", () => {
  const haceRato = Date.now() - TIEMPO_MINIMO_MS - 500;
  assert.equal(seEnvioMuyRapido({ iniciado_en: haceRato }), false);
});
