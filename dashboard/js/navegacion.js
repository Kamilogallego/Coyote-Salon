import { cargarPapelera } from "./papelera.js";
import { cargarCompartir } from "./compartir.js";
import { aplicarFiltroDesdeResumen } from "./clientes.js";

const TITULOS_PAGINA = {
  resumen: "Resumen",
  clientes: "Clientes",
  crecimiento: "Crecimiento",
  compartir: "Compartir formulario",
  papelera: "Papelera",
};

function irAPagina(pagina) {
  document.querySelectorAll(".nav-item[data-page]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.page === pagina);
  });
  document.querySelectorAll(".page").forEach((sec) => {
    sec.classList.toggle("is-active", sec.id === `page-${pagina}`);
  });
  document.querySelector(".content-header-titulo").textContent = TITULOS_PAGINA[pagina] || "Resumen";
}

document.querySelectorAll(".nav-item[data-page]").forEach((btn) => {
  btn.addEventListener("click", () => {
    irAPagina(btn.dataset.page);
    if (btn.dataset.page === "papelera") cargarPapelera();
    if (btn.dataset.page === "compartir") cargarCompartir();
  });
});

document.querySelectorAll("[data-goto]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { filtroCampo, filtroValor } = btn.dataset;
    if (filtroCampo && filtroValor) {
      aplicarFiltroDesdeResumen(filtroCampo, filtroValor);
    }
    irAPagina(btn.dataset.goto);
  });
});

const sidebar = document.getElementById("sidebar");
const CLAVE_SIDEBAR_COLAPSADO = "coyote-sidebar-colapsado";

document.getElementById("toggle-sidebar").addEventListener("click", () => {
  const colapsado = sidebar.classList.toggle("is-collapsed");
  localStorage.setItem(CLAVE_SIDEBAR_COLAPSADO, colapsado ? "1" : "0");
});

if (localStorage.getItem(CLAVE_SIDEBAR_COLAPSADO) === "1") {
  sidebar.classList.add("is-collapsed");
}
