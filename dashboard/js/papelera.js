import { confirmarAccion } from "./modales.js";
import { cargarClientes } from "./clientes.js";
import { cargarEstadisticas, cargarClientesDelMes } from "./resumen.js";
import { escapeHtml, ETIQUETAS_DOCUMENTO, formatearFecha } from "./utils.js";

const tablaPapelera = document.getElementById("tabla-papelera");
const resumenPapelera = document.getElementById("resumen-papelera");
let papeleraActual = [];

const seleccionadosPapelera = new Set();
const accionesMasivasPapelera = document.getElementById("acciones-masivas-papelera");
const contadorSeleccionadosPapelera = document.getElementById("contador-seleccionados-papelera");
const checkboxTodosPapelera = document.getElementById("checkbox-todos-papelera");

function actualizarAccionesMasivasPapelera() {
  accionesMasivasPapelera.classList.toggle("is-oculto", seleccionadosPapelera.size === 0);
  contadorSeleccionadosPapelera.textContent = `${seleccionadosPapelera.size} seleccionado(s)`;
  const idsVisibles = papeleraActual.map((c) => c.id);
  const todosSeleccionados = idsVisibles.length > 0 && idsVisibles.every((id) => seleccionadosPapelera.has(id));
  checkboxTodosPapelera.checked = todosSeleccionados;
  checkboxTodosPapelera.indeterminate =
    !todosSeleccionados && idsVisibles.some((id) => seleccionadosPapelera.has(id));
}

function actualizarBadgePapelera(cantidad) {
  const badge = document.getElementById("badge-papelera");
  badge.textContent = cantidad > 99 ? "99+" : String(cantidad);
  badge.classList.toggle("is-oculto", cantidad === 0);
}

export async function cargarPapelera() {
  const res = await fetch("/api/clientes/papelera", { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  const data = await res.json();
  papeleraActual = data.clientes;
  actualizarBadgePapelera(papeleraActual.length);

  const idsVisibles = new Set(papeleraActual.map((c) => c.id));
  for (const id of seleccionadosPapelera) {
    if (!idsVisibles.has(id)) seleccionadosPapelera.delete(id);
  }

  resumenPapelera.textContent = `${papeleraActual.length} cliente(s) en la papelera`;

  tablaPapelera.innerHTML = papeleraActual
    .map((c) => {
      const eliminadoEn = new Date(c.eliminado_en);
      const diasTranscurridos = Math.max(
        Math.floor((Date.now() - eliminadoEn.getTime()) / (1000 * 60 * 60 * 24)),
        0
      );
      const diasRestantes = Math.min(Math.max(data.dias_retencion - diasTranscurridos, 0), data.dias_retencion);
      const urgente = diasRestantes <= 1;

      return `
    <tr>
      <td class="th-checkbox"><input type="checkbox" class="checkbox-fila" data-id="${c.id}" aria-label="Seleccionar ${escapeHtml(c.nombre)}" ${seleccionadosPapelera.has(c.id) ? "checked" : ""} /></td>
      <td>${escapeHtml(c.nombre)}</td>
      <td>${ETIQUETAS_DOCUMENTO[c.tipo_documento] || escapeHtml(c.tipo_documento)}: ${escapeHtml(c.cedula)}</td>
      <td>${formatearFecha(c.eliminado_en)}</td>
      <td class="${urgente ? "dias-restantes-urgente" : ""}">${diasRestantes} día(s)</td>
      <td class="fila-acciones">
        <button type="button" class="btn-restaurar" data-id="${c.id}">Restaurar</button>
        <button type="button" class="btn-eliminar" data-id="${c.id}">Eliminar definitivo</button>
      </td>
    </tr>
  `;
    })
    .join("");

  actualizarAccionesMasivasPapelera();
}

async function restaurarCliente(id) {
  const cliente = papeleraActual.find((c) => c.id === id);
  const nombre = cliente ? cliente.nombre : "este cliente";
  const confirmado = await confirmarAccion(
    `¿Restaurar a "${nombre}"? Volverá a aparecer en la lista de clientes.`,
    { titulo: "Restaurar cliente", textoAceptar: "Restaurar", peligro: false }
  );
  if (!confirmado) return;

  const res = await fetch(`/api/clientes/${id}/restaurar`, { method: "POST", credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  if (!res.ok) {
    alert("No se pudo restaurar el cliente");
    return;
  }
  cargarPapelera();
  cargarClientes();
  cargarEstadisticas();
  cargarClientesDelMes();
}

async function eliminarDefinitivo(id) {
  const cliente = papeleraActual.find((c) => c.id === id);
  const nombre = cliente ? cliente.nombre : "este cliente";
  const documento = cliente
    ? `${ETIQUETAS_DOCUMENTO[cliente.tipo_documento] || cliente.tipo_documento}: ${cliente.cedula}`
    : "";
  const confirmado = await confirmarAccion(
    `¿Eliminar definitivamente a "${nombre}"${documento ? ` (${documento})` : ""}? Esta acción NO se puede deshacer.`,
    { titulo: "Eliminar definitivamente", textoAceptar: "Eliminar definitivo" }
  );
  if (!confirmado) return;

  const res = await fetch(`/api/clientes/${id}/definitivo`, { method: "DELETE", credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  if (!res.ok) {
    alert("No se pudo eliminar el cliente");
    return;
  }
  cargarPapelera();
}

tablaPapelera.addEventListener("click", (event) => {
  const id = Number(event.target.dataset.id);
  if (!id) return;

  if (event.target.classList.contains("btn-restaurar")) {
    restaurarCliente(id);
  } else if (event.target.classList.contains("btn-eliminar")) {
    eliminarDefinitivo(id);
  }
});

tablaPapelera.addEventListener("change", (event) => {
  if (!event.target.classList.contains("checkbox-fila")) return;
  const id = Number(event.target.dataset.id);
  if (!id) return;
  if (event.target.checked) {
    seleccionadosPapelera.add(id);
  } else {
    seleccionadosPapelera.delete(id);
  }
  actualizarAccionesMasivasPapelera();
});

checkboxTodosPapelera.addEventListener("change", () => {
  if (checkboxTodosPapelera.checked) {
    papeleraActual.forEach((c) => seleccionadosPapelera.add(c.id));
  } else {
    papeleraActual.forEach((c) => seleccionadosPapelera.delete(c.id));
  }
  cargarPapelera();
});

document.getElementById("btn-restaurar-seleccionados").addEventListener("click", async () => {
  const cantidad = seleccionadosPapelera.size;
  if (cantidad === 0) return;

  let mensaje;
  if (cantidad === 1) {
    const id = [...seleccionadosPapelera][0];
    const cliente = papeleraActual.find((c) => c.id === id);
    const nombre = cliente ? cliente.nombre : "este cliente";
    mensaje = `¿Restaurar a "${nombre}"? Volverá a aparecer en la lista de clientes.`;
  } else {
    mensaje = `¿Restaurar ${cantidad} clientes seleccionados? Volverán a aparecer en la lista de clientes.`;
  }

  const confirmado = await confirmarAccion(mensaje, {
    titulo: cantidad === 1 ? "Restaurar cliente" : "Restaurar seleccionados",
    textoAceptar: "Restaurar",
    peligro: false,
  });
  if (!confirmado) return;

  const res = await fetch("/api/clientes/restaurar-multiple", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ids: [...seleccionadosPapelera] }),
  });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  seleccionadosPapelera.clear();
  cargarPapelera();
  cargarClientes();
  cargarEstadisticas();
  cargarClientesDelMes();
});

document.getElementById("btn-eliminar-definitivo-seleccionados").addEventListener("click", async () => {
  const cantidad = seleccionadosPapelera.size;
  if (cantidad === 0) return;

  let mensaje;
  if (cantidad === 1) {
    const id = [...seleccionadosPapelera][0];
    const cliente = papeleraActual.find((c) => c.id === id);
    const nombre = cliente ? cliente.nombre : "este cliente";
    mensaje = `¿Eliminar definitivamente a "${nombre}"? Esta acción NO se puede deshacer.`;
  } else {
    mensaje = `¿Eliminar definitivamente ${cantidad} clientes seleccionados? Esta acción NO se puede deshacer.`;
  }

  const confirmado = await confirmarAccion(mensaje, {
    titulo: "Eliminar definitivamente",
    textoAceptar: "Eliminar definitivo",
  });
  if (!confirmado) return;

  const res = await fetch("/api/clientes/eliminar-definitivo-multiple", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ids: [...seleccionadosPapelera] }),
  });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  seleccionadosPapelera.clear();
  cargarPapelera();
});
