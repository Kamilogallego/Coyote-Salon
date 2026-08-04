import { confirmarAccion } from "./modales.js";
import { escapeHtml, formatearFecha } from "./utils.js";

const tabla = document.getElementById("tabla-solicitudes");
const resumen = document.getElementById("resumen-solicitudes");
const grupoToggle = document.getElementById("filtro-tipo-solicitud");
const thNombre = document.getElementById("th-solicitudes-nombre");
const thCategoria = document.getElementById("th-solicitudes-categoria");
const thDetalle = document.getElementById("th-solicitudes-detalle");

const CONFIG_POR_TIPO = {
  artistas: {
    tituloNombre: "Nombre",
    tituloCategoria: "Tipo de servicio",
    tituloDetalle: "Portafolio",
    nombre: (s) => s.nombre,
    categoria: (s) => s.tipo_servicio,
    detalle: (s) => (s.portafolio ? `<a href="${escapeHtml(s.portafolio)}" target="_blank" rel="noopener">${escapeHtml(s.portafolio)}</a>` : ""),
    detalleTexto: (s) => s.portafolio || "",
  },
  empleo: {
    tituloNombre: "Nombre",
    tituloCategoria: "Cargo",
    tituloDetalle: "",
    nombre: (s) => s.nombre,
    categoria: (s) => s.cargo,
    detalle: () => "",
    detalleTexto: () => "",
  },
  proveedores: {
    tituloNombre: "Empresa",
    tituloCategoria: "Qué suministra",
    tituloDetalle: "Contacto",
    nombre: (s) => s.nombre_empresa,
    categoria: (s) => s.que_suministra,
    detalle: (s) => escapeHtml(s.contacto || ""),
    detalleTexto: (s) => s.contacto || "",
  },
};

let tipoActual = "artistas";
let solicitudesActuales = [];

export async function cargarSolicitudes() {
  const res = await fetch(`/api/solicitudes/${tipoActual}`, { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }

  solicitudesActuales = await res.json();
  renderizarTablaSolicitudes();
}

function renderizarTablaSolicitudes() {
  const config = CONFIG_POR_TIPO[tipoActual];

  thNombre.textContent = config.tituloNombre;
  thCategoria.textContent = config.tituloCategoria;
  thDetalle.textContent = config.tituloDetalle;

  resumen.textContent = `${solicitudesActuales.length} solicitud(es) encontradas`;

  tabla.innerHTML = solicitudesActuales
    .map(
      (s) => `
    <tr data-row-id="${s.id}">
      <td>${escapeHtml(config.nombre(s))}</td>
      <td>${escapeHtml(s.telefono)}</td>
      <td>${escapeHtml(s.correo || "")}</td>
      <td>${escapeHtml(config.categoria(s))}</td>
      <td>${config.detalle(s)}</td>
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
  const config = CONFIG_POR_TIPO[tipoActual];
  const solicitud = solicitudesActuales.find((s) => s.id === id);
  if (!solicitud) return;

  const confirmado = await confirmarAccion(`¿Eliminar la solicitud de "${config.nombre(solicitud)}"? Esta acción no se puede deshacer.`, {
    titulo: "Eliminar solicitud",
    textoAceptar: "Eliminar",
  });
  if (!confirmado) return;

  const res = await fetch(`/api/solicitudes/${tipoActual}/${id}`, { method: "DELETE", credentials: "include" });
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

  const config = CONFIG_POR_TIPO[tipoActual];
  const encabezados = [config.tituloNombre, "Teléfono", "Correo", config.tituloCategoria, config.tituloDetalle, "Fecha"].filter(Boolean);

  const filas = solicitudesActuales.map((s) => {
    const fila = [config.nombre(s), s.telefono, s.correo || "", config.categoria(s)];
    if (config.tituloDetalle) fila.push(config.detalleTexto(s));
    fila.push(formatearFecha(s.fecha_registro));
    return fila;
  });

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
  XLSX.writeFile(libro, `solicitudes-${tipoActual}-coyote-${fecha}.xlsx`);
}

document.getElementById("btn-exportar-solicitudes").addEventListener("click", exportarSolicitudesExcel);
