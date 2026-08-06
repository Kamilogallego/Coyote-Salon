import { cargarPapelera } from "./papelera.js";
import { cargarCompartir } from "./compartir.js";
import { aplicarFiltroDesdeResumen } from "./clientes.js";
import { cargarSolicitudes, marcarSolicitudesVistas } from "./solicitudes.js";

const TITULOS_PAGINA = {
  resumen: "Resumen",
  clientes: "Clientes",
  solicitudes: "Solicitudes",
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
  btn.addEventListener("click", async () => {
    irAPagina(btn.dataset.page);
    if (btn.dataset.page === "papelera") cargarPapelera();
    if (btn.dataset.page === "compartir") cargarCompartir();
    if (btn.dataset.page === "solicitudes") {
      // Espera a que se guarde la marca de "visto" antes de recargar la tabla: si las dos
      // llamadas corren en paralelo, la que termina de ultimas puede pisar el contador con
      // el valor viejo y el badge se queda pegado sin bajar a 0.
      await marcarSolicitudesVistas();
      cargarSolicitudes();
    }
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
