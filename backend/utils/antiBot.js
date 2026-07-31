const TIEMPO_MINIMO_MS = 3000;

function tieneCampoTrampaLleno(body) {
  return Boolean(body.sitio_web);
}

function seEnvioMuyRapido(body) {
  const iniciadoEn = Number(body.iniciado_en);
  if (!iniciadoEn || Number.isNaN(iniciadoEn)) return true;
  return Date.now() - iniciadoEn < TIEMPO_MINIMO_MS;
}

module.exports = { tieneCampoTrampaLleno, seEnvioMuyRapido, TIEMPO_MINIMO_MS };
