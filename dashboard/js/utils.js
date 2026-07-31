export const COLORES = ["#05559c", "#e91f1b", "#5aa0d6", "#a89578", "#8a8a8a", "#c9782f"];

export const ETIQUETAS_GENERO = {
  femenino: "Femenino",
  masculino: "Masculino",
  no_binario: "No binario",
  trans: "Trans",
  otro: "Otro",
};

export const ETIQUETAS_MEDIO = {
  correo: "Correo",
  llamada: "Llamada",
  whatsapp: "WhatsApp",
  ninguno: "Me es indiferente",
};

export const ETIQUETAS_DOCUMENTO = {
  cedula: "CC",
  cedula_extranjeria: "CE",
  pasaporte: "Pasaporte",
  ppt: "PPT",
  pep: "PEP",
};

const nombresPais = new Intl.DisplayNames(["es"], { type: "region" });

export function nombreCompletoPais(codigo) {
  if (!codigo) return "";
  try {
    return nombresPais.of(String(codigo).toUpperCase()) || codigo;
  } catch {
    return codigo;
  }
}

export function formatearDiasFaltantes(dias) {
  if (dias === 0) return "¡Hoy!";
  if (dias === 1) return "Mañana";
  return `${dias} días`;
}

export function formatearMes(valorYYYYMM) {
  const [anio, mes] = valorYYYYMM.split("-");
  const fecha = new Date(Number(anio), Number(mes) - 1, 1);
  return fecha.toLocaleDateString("es-CO", { month: "short", year: "numeric" });
}

export function escapeHtml(valor) {
  const div = document.createElement("div");
  div.textContent = String(valor ?? "");
  return div.innerHTML;
}

export function interpolarColor(colorInicio, colorFin, fraccion) {
  const c1 = colorInicio.match(/\w\w/g).map((h) => parseInt(h, 16));
  const c2 = colorFin.match(/\w\w/g).map((h) => parseInt(h, 16));
  const mezcla = c1.map((v, i) => Math.round(v + (c2[i] - v) * fraccion));
  return `rgb(${mezcla.join(",")})`;
}

export function formatearFecha(valor) {
  if (!valor) return "";
  return new Date(valor).toLocaleDateString("es-CO");
}

export function soloFecha(valor) {
  if (!valor) return "";
  return String(valor).slice(0, 10);
}

export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "";
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const meses = hoy.getMonth() - nacimiento.getMonth();
  if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
}

export function formatearFechaISO(fecha) {
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd = String(fecha.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
