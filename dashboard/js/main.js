// Punto de entrada del dashboard (único <script type="module"> en
// dashboard.html). El navegador resuelve el grafo de imports solo, así que
// no hace falta ordenar <script> tags a mano como con scripts clásicos.
import "./navegacion.js";
import { cargarClientes, setupFiltroPaisCiudad, setupModalPaisAutocomplete } from "./clientes.js";
import { cargarEstadisticas, cargarClientesDelMes } from "./resumen.js";
import { cargarPapelera } from "./papelera.js";
import { confirmarAccion } from "./modales.js";

async function verificarSesion() {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  if (!res.ok) {
    window.location.href = "login.html";
    return;
  }
  await res.json();
}

function mostrarFechaHoy() {
  const hoy = new Date();
  document.getElementById("fecha-hoy").textContent = hoy.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

document.getElementById("logout-btn").addEventListener("click", async () => {
  const confirmado = await confirmarAccion("¿Estás seguro de que quieres cerrar sesión?", {
    titulo: "Cerrar sesión",
    textoAceptar: "Cerrar sesión",
  });
  if (!confirmado) return;

  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  window.location.href = "login.html";
});

mostrarFechaHoy();
setupFiltroPaisCiudad();
setupModalPaisAutocomplete();
verificarSesion().then(() => {
  cargarClientes();
  cargarEstadisticas();
  cargarClientesDelMes();
  cargarPapelera();
});
