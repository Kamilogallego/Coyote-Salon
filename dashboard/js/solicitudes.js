import { confirmarAccion } from "./modales.js";
import { escapeHtml, formatearFecha, ETIQUETAS_DOCUMENTO } from "./utils.js";

const modalDetalle = document.getElementById("modal-detalle");
const detalleTitulo = document.getElementById("detalle-titulo");
const detalleContenido = document.getElementById("detalle-contenido");

function formatearDocumento(s) {
  if (!s.documento_tipo || !s.documento_numero) return "";
  return `${ETIQUETAS_DOCUMENTO[s.documento_tipo] || s.documento_tipo}: ${s.documento_numero}`;
}

const tabla = document.getElementById("tabla-solicitudes");
const resumen = document.getElementById("resumen-solicitudes");
const grupoToggle = document.getElementById("filtro-tipo-solicitud");
const thNombre = document.getElementById("th-solicitudes-nombre");
const thCategoria = document.getElementById("th-solicitudes-categoria");
const thDetalle = document.getElementById("th-solicitudes-detalle");

const tablaPapeleraSolicitudes = document.getElementById("tabla-papelera-solicitudes");
const resumenPapeleraSolicitudes = document.getElementById("resumen-papelera-solicitudes");

const TIPOS = ["empleo", "proveedores"];

const ETIQUETAS_TIPO = {
  empleo: "Empleo",
  proveedores: "Proveedor",
};

const CONFIG_POR_TIPO = {
  empleo: {
    tituloNombre: "Nombre",
    tituloCategoria: "Cargo",
    tituloDetalle: "Disponibilidad",
    nombre: (s) => s.nombre,
    categoria: (s) => s.cargo,
    documento: (s) => formatearDocumento(s),
    detalle: (s) => escapeHtml(s.disponibilidad || ""),
    detalleTexto: (s) => s.disponibilidad || "",
    camposDetalle: (s) => [
      ["Teléfono", s.telefono],
      ["Correo", s.correo],
      ["Cargo", s.cargo],
      ["Documento", formatearDocumento(s)],
      ["Disponibilidad", s.disponibilidad],
      ["Experiencia", s.experiencia],
      ["Registrado", formatearFecha(s.fecha_registro)],
    ],
  },
  proveedores: {
    tituloNombre: "Empresa",
    tituloCategoria: "Qué suministra",
    tituloDetalle: "Contacto",
    nombre: (s) => s.nombre_empresa,
    categoria: (s) => s.que_suministra,
    documento: (s) => formatearDocumento(s),
    detalle: (s) => escapeHtml(s.contacto || ""),
    detalleTexto: (s) => s.contacto || "",
    camposDetalle: (s) => [
      ["Contacto", s.contacto],
      ["Teléfono", s.telefono],
      ["Correo", s.correo],
      ["Qué suministra", s.que_suministra],
      ["Documento", formatearDocumento(s)],
      ["Registrado", formatearFecha(s.fecha_registro)],
    ],
  },
};

let tipoActual = "empleo";
let solicitudesActuales = [];
let papeleraSolicitudesActual = [];

function actualizarBadgeSolicitudes(cantidad) {
  const badge = document.getElementById("badge-solicitudes");
  badge.textContent = cantidad > 99 ? "99+" : String(cantidad);
  badge.classList.toggle("is-oculto", cantidad === 0);
}

function formatearRelativo(fecha) {
  const minutos = Math.floor((Date.now() - new Date(fecha).getTime()) / 60000);
  if (minutos < 1) return "hace un momento";
  if (minutos < 60) return `hace ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `hace ${horas} h`;
  return `hace ${Math.floor(horas / 24)} día(s)`;
}

function actualizarBadgesPorTipo(conteosPorTipo, tipoMasReciente, fechaMasReciente) {
  TIPOS.forEach((tipo) => {
    const badge = document.querySelector(`.toggle-badge[data-badge="${tipo}"]`);
    const cantidad = conteosPorTipo[tipo];
    badge.textContent = cantidad > 99 ? "99+" : String(cantidad);
    badge.classList.toggle("is-oculto", cantidad === 0);

    const esReciente = tipo === tipoMasReciente;
    badge.classList.toggle("es-reciente", esReciente);
    badge.title = esReciente ? `Más reciente: ${formatearRelativo(fechaMasReciente)}` : "";
  });
}

export async function cargarConteoSolicitudes() {
  const respuestas = await Promise.all(TIPOS.map((tipo) => fetch(`/api/solicitudes/${tipo}`, { credentials: "include" })));
  if (respuestas.some((res) => res.status === 401)) {
    window.location.href = "login.html";
    return;
  }
  const listas = await Promise.all(respuestas.map((res) => res.json()));

  const conteosPorTipo = {};
  let tipoMasReciente = null;
  let fechaMasReciente = null;

  TIPOS.forEach((tipo, i) => {
    const lista = listas[i];
    conteosPorTipo[tipo] = lista.length;
    for (const s of lista) {
      if (!fechaMasReciente || new Date(s.fecha_registro) > new Date(fechaMasReciente)) {
        fechaMasReciente = s.fecha_registro;
        tipoMasReciente = tipo;
      }
    }
  });

  actualizarBadgeSolicitudes(listas.reduce((total, lista) => total + lista.length, 0));
  actualizarBadgesPorTipo(conteosPorTipo, tipoMasReciente, fechaMasReciente);
}

export async function cargarSolicitudes() {
  const res = await fetch(`/api/solicitudes/${tipoActual}`, { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }

  solicitudesActuales = await res.json();
  renderizarTablaSolicitudes();
  cargarConteoSolicitudes();
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
      <td>${escapeHtml(config.documento(s))}</td>
      <td>${config.detalle(s)}</td>
      <td>${formatearFecha(s.fecha_registro)}</td>
      <td class="fila-acciones">
        <button type="button" class="btn-ver" data-id="${s.id}" title="Ver detalle">👁</button>
        <button type="button" class="btn-eliminar-solicitud" data-id="${s.id}" title="Eliminar">🗑</button>
      </td>
    </tr>
  `
    )
    .join("");
}

function verDetalleSolicitud(id) {
  const config = CONFIG_POR_TIPO[tipoActual];
  const s = solicitudesActuales.find((solicitud) => solicitud.id === id);
  if (!s) return;

  detalleTitulo.textContent = config.nombre(s);

  detalleContenido.innerHTML = config
    .camposDetalle(s)
    .map(
      ([etiqueta, valor]) => `
      <div class="detalle-campo">
        <span class="detalle-etiqueta">${escapeHtml(etiqueta)}</span>
        <span class="detalle-valor">${escapeHtml(valor || "—")}</span>
      </div>`
    )
    .join("");

  modalDetalle.showModal();
}

async function eliminarSolicitud(id) {
  const config = CONFIG_POR_TIPO[tipoActual];
  const solicitud = solicitudesActuales.find((s) => s.id === id);
  if (!solicitud) return;

  const confirmado = await confirmarAccion(`¿Eliminar la solicitud de "${config.nombre(solicitud)}"? Se moverá a la papelera durante 30 días.`, {
    titulo: "Eliminar solicitud",
    textoAceptar: "Eliminar",
    peligro: false,
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
  const botonVer = evento.target.closest(".btn-ver");
  if (botonVer) {
    verDetalleSolicitud(Number(botonVer.dataset.id));
    return;
  }

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
  const encabezados = [config.tituloNombre, "Teléfono", "Correo", config.tituloCategoria, "Documento", config.tituloDetalle, "Fecha"].filter(
    Boolean
  );

  const filas = solicitudesActuales.map((s) => {
    const fila = [config.nombre(s), s.telefono, s.correo || "", config.categoria(s), config.documento(s)];
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

// --- Papelera de solicitudes ---

export async function cargarPapeleraSolicitudes() {
  const res = await fetch("/api/solicitudes/papelera", { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }

  const data = await res.json();
  papeleraSolicitudesActual = data.solicitudes;

  resumenPapeleraSolicitudes.textContent = `${papeleraSolicitudesActual.length} solicitud(es) en la papelera`;

  tablaPapeleraSolicitudes.innerHTML = papeleraSolicitudesActual
    .map((s) => {
      const eliminadoEn = new Date(s.eliminado_en);
      const diasTranscurridos = Math.max(Math.floor((Date.now() - eliminadoEn.getTime()) / (1000 * 60 * 60 * 24)), 0);
      const diasRestantes = Math.min(Math.max(data.dias_retencion - diasTranscurridos, 0), data.dias_retencion);
      const urgente = diasRestantes <= 1;

      return `
    <tr>
      <td>${ETIQUETAS_TIPO[s.tipo] || escapeHtml(s.tipo)}</td>
      <td>${escapeHtml(s.nombre)}</td>
      <td>${escapeHtml(s.detalle || "")}</td>
      <td>${formatearFecha(s.eliminado_en)}</td>
      <td class="${urgente ? "dias-restantes-urgente" : ""}">${diasRestantes} día(s)</td>
      <td class="fila-acciones">
        <button type="button" class="btn-restaurar" data-tipo="${s.tipo}" data-id="${s.id}">Restaurar</button>
        <button type="button" class="btn-eliminar" data-tipo="${s.tipo}" data-id="${s.id}">Eliminar definitivo</button>
      </td>
    </tr>
  `;
    })
    .join("");
}

async function restaurarSolicitud(tipo, id) {
  const solicitud = papeleraSolicitudesActual.find((s) => s.tipo === tipo && s.id === id);
  const nombre = solicitud ? solicitud.nombre : "esta solicitud";
  const confirmado = await confirmarAccion(`¿Restaurar la solicitud de "${nombre}"? Volverá a aparecer en Solicitudes.`, {
    titulo: "Restaurar solicitud",
    textoAceptar: "Restaurar",
    peligro: false,
  });
  if (!confirmado) return;

  const res = await fetch(`/api/solicitudes/${tipo}/${id}/restaurar`, { method: "POST", credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  if (!res.ok) {
    alert("No se pudo restaurar la solicitud");
    return;
  }
  cargarPapeleraSolicitudes();
  cargarConteoSolicitudes();
}

async function eliminarSolicitudDefinitivo(tipo, id) {
  const solicitud = papeleraSolicitudesActual.find((s) => s.tipo === tipo && s.id === id);
  const nombre = solicitud ? solicitud.nombre : "esta solicitud";
  const confirmado = await confirmarAccion(`¿Eliminar definitivamente la solicitud de "${nombre}"? Esta acción NO se puede deshacer.`, {
    titulo: "Eliminar definitivamente",
    textoAceptar: "Eliminar definitivo",
  });
  if (!confirmado) return;

  const res = await fetch(`/api/solicitudes/${tipo}/${id}/definitivo`, { method: "DELETE", credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  if (!res.ok) {
    alert("No se pudo eliminar la solicitud");
    return;
  }
  cargarPapeleraSolicitudes();
}

tablaPapeleraSolicitudes.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-id]");
  if (!boton) return;
  const tipo = boton.dataset.tipo;
  const id = Number(boton.dataset.id);

  if (boton.classList.contains("btn-restaurar")) {
    restaurarSolicitud(tipo, id);
  } else if (boton.classList.contains("btn-eliminar")) {
    eliminarSolicitudDefinitivo(tipo, id);
  }
});
