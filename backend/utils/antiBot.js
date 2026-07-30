// Protección anti-bot para el formulario público, sin depender de servicios
// externos (reCAPTCHA/Turnstile): un campo trampa invisible + un tiempo
// mínimo de llenado. Ninguno de los dos molesta a una persona real, pero
// ambos detienen a la mayoría de bots de spam automatizado.
const TIEMPO_MINIMO_MS = 3000;

// Bots que autocompletan todos los campos del formulario llenan también
// este, que un humano nunca ve ni llena.
function tieneCampoTrampaLleno(body) {
  return Boolean(body.sitio_web);
}

// Un bot suele enviar el formulario en milisegundos; una persona real
// tarda al menos unos segundos en llenarlo. iniciado_en llega desde el
// frontend con la hora en la que se cargó el formulario.
function seEnvioMuyRapido(body) {
  const iniciadoEn = Number(body.iniciado_en);
  if (!iniciadoEn || Number.isNaN(iniciadoEn)) return true;
  return Date.now() - iniciadoEn < TIEMPO_MINIMO_MS;
}

module.exports = { tieneCampoTrampaLleno, seEnvioMuyRapido, TIEMPO_MINIMO_MS };
