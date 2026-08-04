import { confirmarAccion } from "./modales.js";
import { escapeHtml, formatearFecha } from "./utils.js";

const tabla = document.getElementById("tabla-solicitudes");
const resumen = document.getElementById("resumen-solicitudes");
const grupoToggle = document.getElementById("filtro-tipo-solicitud");

let tipoActual = "artista";
let solicitudesActuales = [];

function detalleColumna(s) {
  if (s.tipo === "artista" && s.portafolio) {
    return `<a href="${escapeHtml(s.portafolio)}" target="_blank" rel="noopener">${escapeHtml(s.portafolio)}</a>`;
  }
  if (s.tipo === "proveedor") {
    return escapeHtml(s.contacto || "");
  }
  return "";
}

function detalleColumnaTexto(s) {
  if (s.tipo === "artista") return s.portafolio || "";
  if (s.tipo === "proveedor") return s.contacto || "";
  return "";
}

export async function cargarSolicitudes() {
  const res = await fetch(`/api/solicitudes?tipo=${tipoActual}`, { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }

  solicitudesActuales = await res.json();
  renderizarTablaSolicitudes();
}

function renderizarTablaSolicitudes() {
  resumen.textContent = `${solicitudesActuales.length} solicitud(es) encontradas`;

  tabla.innerHTML = solicitudesActuales
    .map(
      (s) => `
    <tr data-row-id="${s.id}">
      <td>${escapeHtml(s.nombre)}</td>
      <td>${escapeHtml(s.telefono)}</td>
      <td>${escapeHtml(s.correo || "")}</td>
      <td>${escapeHtml(s.categoria)}</td>
      <td>${detalleColumna(s)}</td>
      <td>${formatearFecha(s.fecha_registro)}</td>
      <td class="fila-acciones">
        <button type="button" class="btn-eliminar-solicitud" data-id="${s.id}" title="Eliminar">🗑</button>
      </td>
    </tr>
  `
    )
    .join("");
}

async function eliminarSolicitud(id) {
  const solicitud = solicitudesActuales.find((s) => s.id === id);
  if (!solicitud) return;

  const confirmado = await confirmarAccion(`¿Eliminar la solicitud de "${solicitud.nombre}"? Esta acción no se puede deshacer.`, {
    titulo: "Eliminar solicitud",
    textoAceptar: "Eliminar",
  });
  if (!confirmado) return;

  const res = await fetch(`/api/solicitudes/${id}`, { method: "DELETE", credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  if (!res.ok) {
    alert("No se pudo eliminar la solicitud");
    return;
  }

  cargarSolicitudes();
}

tabla.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".btn-eliminar-solicitud");
  if (!boton) return;
  eliminarSolicitud(Number(boton.dataset.id));
});

grupoToggle.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".toggle-btn");
  if (!boton) return;

  tipoActual = boton.dataset.tipo;
  grupoToggle.querySelectorAll(".toggle-btn").forEach((btn) => btn.classList.toggle("is-active", btn === boton));
  cargarSolicitudes();
});

async function exportarSolicitudesExcel() {
  if (solicitudesActuales.length === 0) {
    alert("No hay solicitudes para exportar con el filtro actual");
    return;
  }

  const encabezados = ["Nombre", "Teléfono", "Correo", "Categoría", "Detalle", "Fecha"];

  const filas = solicitudesActuales.map((s) => [
    s.nombre,
    s.telefono,
    s.correo || "",
    s.categoria,
    detalleColumnaTexto(s),
    formatearFecha(s.fecha_registro),
  ]);

  const XLSX = await import("https://esm.sh/xlsx@0.18.5");

  const hoja = XLSX.utils.aoa_to_sheet([encabezados, ...filas]);

  hoja["!cols"] = encabezados.map((titulo, i) => {
    const anchoMax = Math.max(titulo.length, ...filas.map((fila) => String(fila[i] ?? "").length));
    return { wch: Math.min(Math.max(anchoMax + 2, 10), 32) };
  });

  hoja["!autofilter"] = {
    ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: filas.length, c: encabezados.length - 1 } }),
  };

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Solicitudes");

  const fecha = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(libro, `solicitudes-coyote-${tipoActual}-${fecha}.xlsx`);
}

document.getElementById("btn-exportar-solicitudes").addEventListener("click", exportarSolicitudesExcel);
