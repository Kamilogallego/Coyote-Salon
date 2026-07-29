const COLORES = ["#05559c", "#e91f1b", "#5aa0d6", "#a89578", "#8a8a8a", "#c9782f"];

const ETIQUETAS_GENERO = {
  femenino: "Femenino",
  masculino: "Masculino",
  no_binario: "No binario",
  trans: "Trans",
  otro: "Otro",
};

const ETIQUETAS_MEDIO = {
  correo: "Correo",
  llamada: "Llamada",
  whatsapp: "WhatsApp",
  ninguno: "Me es indiferente",
};

const ETIQUETAS_DOCUMENTO = {
  cedula: "CC",
  cedula_extranjeria: "CE",
  pasaporte: "Pasaporte",
  ppt: "PPT",
  pep: "PEP",
};

const nombresPais = new Intl.DisplayNames(["es"], { type: "region" });

function nombreCompletoPais(codigo) {
  if (!codigo) return "";
  try {
    return nombresPais.of(String(codigo).toUpperCase()) || codigo;
  } catch {
    return codigo;
  }
}

function formatearDiasFaltantes(dias) {
  if (dias === 0) return "¡Hoy!";
  if (dias === 1) return "Mañana";
  return `${dias} días`;
}

function renderizarTablaFechas(contenedorId, filas) {
  const tbody = document.getElementById(contenedorId);
  if (filas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="chart-empty">Sin fechas registradas</td></tr>`;
    return;
  }
  tbody.innerHTML = filas
    .map((f) => {
      const urgente = f.dias_faltantes <= 7;
      return `
      <tr>
        <td>${escapeHtml(f.nombre)}</td>
        <td>${new Date(f.fecha).toLocaleDateString("es-CO", { day: "2-digit", month: "long" })}</td>
        <td class="${urgente ? "dias-restantes-urgente" : ""}">${formatearDiasFaltantes(f.dias_faltantes)}</td>
      </tr>`;
    })
    .join("");
}

function formatearMes(valorYYYYMM) {
  const [anio, mes] = valorYYYYMM.split("-");
  const fecha = new Date(Number(anio), Number(mes) - 1, 1);
  return fecha.toLocaleDateString("es-CO", { month: "short", year: "numeric" });
}

function escapeHtml(valor) {
  const div = document.createElement("div");
  div.textContent = String(valor ?? "");
  return div.innerHTML;
}

// ---- Gráficas con CSS puro (sin librerías externas) ----

function renderDonut(contenedor, datos) {
  if (!datos.length) {
    contenedor.innerHTML = `<span class="chart-empty">Sin datos todavía</span>`;
    return;
  }

  const total = datos.reduce((suma, d) => suma + d.valor, 0);
  let acumulado = 0;
  const segmentos = datos.map((d, i) => {
    const inicio = (acumulado / total) * 360;
    acumulado += d.valor;
    const fin = (acumulado / total) * 360;
    return `${COLORES[i % COLORES.length]} ${inicio}deg ${fin}deg`;
  });

  const leyenda = datos
    .map(
      (d, i) => `
      <li>
        <span class="legend-dot" style="background:${COLORES[i % COLORES.length]}"></span>
        ${escapeHtml(d.etiqueta)} (${d.valor})
      </li>`
    )
    .join("");

  contenedor.innerHTML = `
    <div class="donut-wrap">
      <div class="donut" style="background: conic-gradient(${segmentos.join(", ")})"></div>
      <ul class="donut-legend">${leyenda}</ul>
    </div>
  `;
}

function renderBarChart(contenedor, datos) {
  if (!datos.length) {
    contenedor.innerHTML = `<span class="chart-empty">Sin datos todavía</span>`;
    return;
  }

  const max = Math.max(...datos.map((d) => d.valor), 1);
  contenedor.innerHTML = `
    <div class="bar-chart">
      ${datos
        .map(
          (d) => `
        <div class="bar-item">
          <span class="bar-value">${d.valor}</span>
          <div class="bar-fill" style="height:${(d.valor / max) * 100}%"></div>
          <span class="bar-label">${escapeHtml(d.etiqueta)}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// ---- Navegación entre páginas ----

const TITULOS_PAGINA = {
  resumen: "Resumen",
  clientes: "Clientes",
  crecimiento: "Crecimiento",
  edad: "Rango de edad",
  medio: "Medio de contacto",
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

// ---- Compartir formulario (link + QR) ----

let qrDataUrl = null;

function cargarCompartir() {
  const url = `${window.location.origin}/coyote/formulario/formulario.html`;
  const input = document.getElementById("compartir-link");
  input.value = url;

  if (!qrDataUrl) {
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    qrDataUrl = qr.createDataURL(8, 4);
    document.getElementById("compartir-qr").src = qrDataUrl;
  }
}

document.getElementById("btn-copiar-link").addEventListener("click", async () => {
  const input = document.getElementById("compartir-link");
  await navigator.clipboard.writeText(input.value);
  const btn = document.getElementById("btn-copiar-link");
  const textoOriginal = btn.textContent;
  btn.textContent = "¡Copiado!";
  setTimeout(() => (btn.textContent = textoOriginal), 1500);
});

document.getElementById("btn-descargar-qr").addEventListener("click", () => {
  if (!qrDataUrl) return;
  const enlace = document.createElement("a");
  enlace.download = "coyote-qr-registro.gif";
  enlace.href = qrDataUrl;
  enlace.click();
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

// ---- Menú lateral y filtros colapsables ----

const sidebar = document.getElementById("sidebar");
const CLAVE_SIDEBAR_COLAPSADO = "coyote-sidebar-colapsado";

document.getElementById("toggle-sidebar").addEventListener("click", () => {
  const colapsado = sidebar.classList.toggle("is-collapsed");
  localStorage.setItem(CLAVE_SIDEBAR_COLAPSADO, colapsado ? "1" : "0");
});

if (localStorage.getItem(CLAVE_SIDEBAR_COLAPSADO) === "1") {
  sidebar.classList.add("is-collapsed");
}

const toggleFiltros = document.getElementById("toggle-filtros");
const filtrosCuerpo = document.getElementById("filtros-cuerpo");
const filtersPanel = document.getElementById("filters-panel");

toggleFiltros.addEventListener("click", () => {
  const expandido = toggleFiltros.getAttribute("aria-expanded") === "true";
  toggleFiltros.setAttribute("aria-expanded", String(!expandido));
  filtrosCuerpo.classList.toggle("is-collapsed", expandido);
  filtersPanel.classList.toggle("is-collapsed", expandido);
});

// ---- Sesión y estadísticas ----

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

async function cargarEstadisticas() {
  const res = await fetch("/api/estadisticas", { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  const stats = await res.json();

  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-nuevos").textContent = stats.nuevosEsteMes;
  document.getElementById("stat-pareja").textContent = stats.conPareja;
  document.getElementById("stat-hijos").textContent = stats.conHijos;

  const medioDatos = stats.medioContacto.map((m) => ({
    etiqueta: ETIQUETAS_MEDIO[m.medio_contacto] || m.medio_contacto,
    valor: m.cantidad,
  }));
  const edadDatos = stats.rangoEdad.map((r) => ({ etiqueta: r.rango, valor: r.cantidad }));
  const crecimientoDatos = stats.crecimientoMensual.map((c) => ({
    etiqueta: formatearMes(c.mes),
    valor: c.cantidad,
  }));

  renderBarChart(document.getElementById("resumen-medio"), medioDatos);
  renderBarChart(document.getElementById("resumen-crecimiento"), crecimientoDatos);

  renderBarChart(document.getElementById("chart-medio"), medioDatos);
  renderBarChart(document.getElementById("chart-edad"), edadDatos);
  renderBarChart(document.getElementById("chart-crecimiento"), crecimientoDatos);

  document.getElementById("tabla-crecimiento-mensual").innerHTML = stats.crecimientoMensual
    .map((c, i) => {
      const anterior = i > 0 ? stats.crecimientoMensual[i - 1].cantidad : null;
      let variacion = "—";
      if (anterior !== null) {
        if (anterior === 0) {
          variacion = c.cantidad > 0 ? "▲ nuevo" : "—";
        } else {
          const cambio = Math.round(((c.cantidad - anterior) / anterior) * 100);
          variacion =
            cambio > 0 ? `▲ ${cambio}%` : cambio < 0 ? `▼ ${Math.abs(cambio)}%` : "— 0%";
        }
      }
      const claseVariacion = variacion.startsWith("▲")
        ? "variacion-positiva"
        : variacion.startsWith("▼")
        ? "variacion-negativa"
        : "";
      return `
        <tr>
          <td>${escapeHtml(formatearMes(c.mes))}</td>
          <td>${c.cantidad}</td>
          <td class="${claseVariacion}">${variacion}</td>
        </tr>`;
    })
    .join("");

  const edadTop = edadDatos.reduce((max, d) => (d.valor > (max?.valor ?? -1) ? d : max), null);
  document.getElementById("resumen-edad-top").textContent = edadTop ? edadTop.etiqueta : "—";
  document.getElementById("resumen-edad-detalle").textContent = edadTop
    ? `${edadTop.valor} cliente(s) en este rango`
    : "";

  document.getElementById("resumen-ultimos").innerHTML = stats.ultimosClientes
    .map(
      (c) => `
      <tr>
        <td>${escapeHtml(c.nombre)}</td>
        <td>${ETIQUETAS_MEDIO[c.medio_contacto] || escapeHtml(c.medio_contacto)}</td>
        <td>${new Date(c.fecha_registro).toLocaleDateString("es-CO")}</td>
      </tr>
    `
    )
    .join("");

  renderizarTablaFechas("tabla-cumpleanos", stats.proximosCumpleanos);
  renderizarTablaFechas("tabla-aniversarios", stats.proximosAniversarios);
}

// ---- Navegador de meses (ver clientes registrados mes a mes) ----

let mesActual = new Date();
mesActual.setDate(1);

function formatearFechaISO(fecha) {
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd = String(fecha.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function cargarClientesDelMes() {
  document.getElementById("mes-actual-titulo").textContent = mesActual.toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric",
  });

  const inicio = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
  const fin = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);

  const params = new URLSearchParams({
    registrado_desde: formatearFechaISO(inicio),
    registrado_hasta: formatearFechaISO(fin),
  });

  const res = await fetch(`/api/clientes?${params.toString()}`, { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  const clientesDelMes = await res.json();

  document.getElementById("mes-resumen").textContent = `${clientesDelMes.length} cliente(s) registrados este mes`;

  document.getElementById("mes-tabla").innerHTML = clientesDelMes
    .map(
      (c) => `
      <tr>
        <td>${escapeHtml(c.nombre)}</td>
        <td>${ETIQUETAS_DOCUMENTO[c.tipo_documento] || escapeHtml(c.tipo_documento)}: ${escapeHtml(c.cedula)}</td>
        <td>${ETIQUETAS_MEDIO[c.medio_contacto] || escapeHtml(c.medio_contacto)}</td>
        <td>${formatearFecha(c.fecha_registro)}</td>
      </tr>
    `
    )
    .join("");
}

document.getElementById("mes-anterior").addEventListener("click", () => {
  mesActual.setMonth(mesActual.getMonth() - 1);
  cargarClientesDelMes();
});

document.getElementById("mes-siguiente").addEventListener("click", () => {
  mesActual.setMonth(mesActual.getMonth() + 1);
  cargarClientesDelMes();
});

// ---- Tabla y CRUD de clientes ----

const tabla = document.getElementById("tabla-clientes");
const resumen = document.getElementById("resumen");
const buscadorClientes = document.getElementById("buscador-clientes");
const filtroNombre = document.getElementById("filtro-nombre");
const filtroTelefono = document.getElementById("filtro-telefono");
const filtroTipoDocumento = document.getElementById("filtro-tipo-documento");
const filtroDocumento = document.getElementById("filtro-documento");
const filtroCiudad = document.getElementById("filtro-ciudad");
const filtroPais = document.getElementById("filtro-pais");
const filtroPaisCodigo = document.getElementById("filtro-pais-codigo");
const filtroGenero = document.getElementById("filtro-genero");
const filtroMedio = document.getElementById("filtro-medio");
const filtroPadre = document.getElementById("filtro-padre");
const filtroPareja = document.getElementById("filtro-pareja");
const filtroCampoAniversario = document.getElementById("filtro-campo-aniversario");
const filtroAniversarioDesde = document.getElementById("filtro-aniversario-desde");
const filtroAniversarioHasta = document.getElementById("filtro-aniversario-hasta");
const filtroEdadMin = document.getElementById("filtro-edad-min");
const filtroEdadMax = document.getElementById("filtro-edad-max");

const CAMPOS_FILTRO = [
  filtroNombre,
  filtroTelefono,
  filtroTipoDocumento,
  filtroDocumento,
  filtroCiudad,
  filtroPais,
  filtroPaisCodigo,
  filtroGenero,
  filtroMedio,
  filtroPadre,
  filtroPareja,
  filtroAniversarioDesde,
  filtroAniversarioHasta,
  filtroEdadMin,
  filtroEdadMax,
];

function actualizarVisibilidadAniversario() {
  const mostrar = filtroPareja.value === "si";
  filtroCampoAniversario.classList.toggle("is-oculto", !mostrar);
  if (!mostrar) {
    filtroAniversarioDesde.value = "";
    filtroAniversarioHasta.value = "";
  }
}

function normalizarNombreCiudad(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/d\.?\s*c\.?/gi, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

async function setupFiltroPaisCiudad() {
  const listaPaisSugerencias = document.getElementById("filtro-pais-suggestions");
  const listaCiudadSugerencias = document.getElementById("filtro-ciudad-suggestions");

  const { Country, State, City } = await import("https://esm.sh/country-state-city@3");

  const paisesOrdenados = Country.getAllCountries()
    .map((p) => ({ code: p.isoCode, nombre: nombreCompletoPais(p.isoCode) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

  const codigosLlamadaPorPais = new Map(
    Country.getAllCountries().map((p) => [p.isoCode, String(p.phonecode).replace(/[^0-9]/g, "")])
  );

  formatearTelefono = (telefono, paisIso) => {
    const codigo = codigosLlamadaPorPais.get(paisIso);
    if (!telefono || !codigo || !telefono.startsWith(`+${codigo}`)) return telefono || "";
    return `+${codigo} ${telefono.slice(1 + codigo.length)}`;
  };

  function ocultarSugerenciasPais() {
    listaPaisSugerencias.hidden = true;
    listaPaisSugerencias.innerHTML = "";
    filtroPais.setAttribute("aria-expanded", "false");
  }

  function mostrarSugerenciasPais() {
    const texto = filtroPais.value.trim().toLowerCase();
    const coincidencias = (
      texto ? paisesOrdenados.filter((p) => p.nombre.toLowerCase().includes(texto)) : paisesOrdenados
    ).slice(0, 200);

    if (coincidencias.length === 0) {
      ocultarSugerenciasPais();
      return;
    }

    listaPaisSugerencias.innerHTML = coincidencias
      .map((p) => `<li role="option" data-code="${p.code}">${escapeHtml(p.nombre)}</li>`)
      .join("");
    listaPaisSugerencias.hidden = false;
    filtroPais.setAttribute("aria-expanded", "true");
  }

  function seleccionarPais(code) {
    filtroPaisCodigo.value = code;
    filtroPais.value = paisesOrdenados.find((p) => p.code === code)?.nombre || code;
  }

  listaPaisSugerencias.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    seleccionarPais(li.dataset.code);
    ocultarSugerenciasPais();
    actualizarCiudadesFiltro(li.dataset.code);
    cargarClientes();
  });

  filtroPais.addEventListener("input", () => {
    filtroPaisCodigo.value = "";
    mostrarSugerenciasPais();
  });
  filtroPais.addEventListener("focus", mostrarSugerenciasPais);
  filtroPais.addEventListener("blur", () => {
    // Retraso: en tactil el blur puede llegar antes que el click de la sugerencia.
    setTimeout(() => {
      ocultarSugerenciasPais();
      if (!filtroPaisCodigo.value && filtroPais.value.trim()) {
        filtroPais.value = "";
        actualizarCiudadesFiltro("");
        cargarClientes();
      }
    }, 200);
  });

  let ciudadesPais = [];

  function ocultarSugerenciasCiudad() {
    listaCiudadSugerencias.hidden = true;
    listaCiudadSugerencias.innerHTML = "";
    filtroCiudad.setAttribute("aria-expanded", "false");
  }

  function mostrarSugerenciasCiudad() {
    if (ciudadesPais.length === 0) {
      ocultarSugerenciasCiudad();
      return;
    }
    const texto = filtroCiudad.value.trim().toLowerCase();
    const coincidencias = (
      texto ? ciudadesPais.filter((c) => c.toLowerCase().includes(texto)) : ciudadesPais
    ).slice(0, 200);

    if (coincidencias.length === 0) {
      ocultarSugerenciasCiudad();
      return;
    }

    listaCiudadSugerencias.innerHTML = coincidencias.map((c) => `<li role="option">${escapeHtml(c)}</li>`).join("");
    listaCiudadSugerencias.hidden = false;
    filtroCiudad.setAttribute("aria-expanded", "true");
  }

  listaCiudadSugerencias.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    filtroCiudad.value = li.textContent;
    ocultarSugerenciasCiudad();
    cargarClientes();
  });

  filtroCiudad.addEventListener("focus", mostrarSugerenciasCiudad);
  filtroCiudad.addEventListener("blur", () => setTimeout(ocultarSugerenciasCiudad, 200));
  filtroCiudad.addEventListener("input", mostrarSugerenciasCiudad);

  actualizarCiudadesFiltro = (codigoPais) => {
    if (!codigoPais) {
      ciudadesPais = [];
      return;
    }
    if (codigoPais === "CO") {
      const departamentos = new Map(State.getStatesOfCountry("CO").map((d) => [d.isoCode, d.name]));
      const vistas = new Set();
      ciudadesPais = (City.getCitiesOfCountry("CO") || [])
        .map((c) => `${c.name}, ${departamentos.get(c.stateCode) || ""}`.trim().replace(/,\s*$/, ""))
        .filter((etiqueta) => {
          const clave = normalizarNombreCiudad(etiqueta);
          if (vistas.has(clave)) return false;
          vistas.add(clave);
          return true;
        })
        .sort((a, b) => a.localeCompare(b, "es"));
    } else {
      ciudadesPais = (City.getCitiesOfCountry(codigoPais) || [])
        .map((c) => c.name)
        .sort((a, b) => a.localeCompare(b, "es"));
    }
  };

  actualizarCiudadesFiltro("CO");

  if (clientesActuales.length > 0) cargarClientes();
}

let actualizarCiudadesFiltro = () => {};
let formatearTelefono = (telefono) => telefono || "";

let establecerPaisModal = () => {};

async function setupModalPaisAutocomplete() {
  const inputPaisNombre = document.getElementById("m-pais-nombre");
  const inputPaisCodigo = document.getElementById("m-pais");
  const listaSugerencias = document.getElementById("m-pais-suggestions");

  const { Country } = await import("https://esm.sh/country-state-city@3");

  const paisesOrdenados = Country.getAllCountries()
    .map((p) => ({ code: p.isoCode, nombre: nombreCompletoPais(p.isoCode) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

  function ocultarSugerencias() {
    listaSugerencias.hidden = true;
    listaSugerencias.innerHTML = "";
    inputPaisNombre.setAttribute("aria-expanded", "false");
  }

  function mostrarSugerencias() {
    const texto = inputPaisNombre.value.trim().toLowerCase();
    const coincidencias = (
      texto ? paisesOrdenados.filter((p) => p.nombre.toLowerCase().includes(texto)) : paisesOrdenados
    ).slice(0, 200);

    if (coincidencias.length === 0) {
      ocultarSugerencias();
      return;
    }

    listaSugerencias.innerHTML = coincidencias
      .map((p) => `<li role="option" data-code="${p.code}">${escapeHtml(p.nombre)}</li>`)
      .join("");
    listaSugerencias.hidden = false;
    inputPaisNombre.setAttribute("aria-expanded", "true");
  }

  function seleccionarPais(code) {
    inputPaisCodigo.value = code;
    inputPaisNombre.value = paisesOrdenados.find((p) => p.code === code)?.nombre || code;
    inputPaisNombre.classList.remove("invalid");
  }

  listaSugerencias.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    seleccionarPais(li.dataset.code);
    ocultarSugerencias();
  });

  inputPaisNombre.addEventListener("input", () => {
    inputPaisCodigo.value = "";
    mostrarSugerencias();
  });
  inputPaisNombre.addEventListener("focus", mostrarSugerencias);
  inputPaisNombre.addEventListener("blur", () => {
    setTimeout(() => {
      ocultarSugerencias();
      if (!inputPaisCodigo.value) {
        inputPaisNombre.value = "";
      }
    }, 200);
  });

  establecerPaisModal = seleccionarPais;
}

const FILTROS_RESUMEN = {
  pareja: filtroPareja,
  padre: filtroPadre,
};

function aplicarFiltroDesdeResumen(campo, valor) {
  const campoFiltro = FILTROS_RESUMEN[campo];
  if (!campoFiltro) return;

  CAMPOS_FILTRO.forEach((elemento) => (elemento.value = ""));
  buscadorClientes.value = "";
  campoFiltro.value = valor;
  cargarClientes();
}

const modal = document.getElementById("modal-cliente");
const formCliente = document.getElementById("form-cliente");
const modalTitulo = document.getElementById("modal-titulo");
const modalError = document.getElementById("modal-error");

const modalDetalle = document.getElementById("modal-detalle");
const detalleTitulo = document.getElementById("detalle-titulo");
const detalleContenido = document.getElementById("detalle-contenido");

let clientesActuales = [];

function formatearFecha(valor) {
  if (!valor) return "";
  return new Date(valor).toLocaleDateString("es-CO");
}

function soloFecha(valor) {
  if (!valor) return "";
  return String(valor).slice(0, 10);
}

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "";
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const meses = hoy.getMonth() - nacimiento.getMonth();
  if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
}

async function cargarClientes() {
  const params = new URLSearchParams();
  if (buscadorClientes.value.trim()) params.set("busqueda", buscadorClientes.value.trim());
  if (filtroNombre.value.trim()) params.set("nombre", filtroNombre.value.trim());
  if (filtroTelefono.value.trim()) params.set("telefono", filtroTelefono.value.trim());
  if (filtroTipoDocumento.value) params.set("tipo_documento", filtroTipoDocumento.value);
  if (filtroDocumento.value.trim()) params.set("cedula", filtroDocumento.value.trim());
  if (filtroCiudad.value.trim()) params.set("ciudad", filtroCiudad.value.trim());
  if (filtroPaisCodigo.value) params.set("pais", filtroPaisCodigo.value);
  if (filtroGenero.value) params.set("genero", filtroGenero.value);
  if (filtroMedio.value) params.set("medio_contacto", filtroMedio.value);
  if (filtroPadre.value) params.set("es_padre", filtroPadre.value);
  if (filtroPareja.value) params.set("tiene_pareja", filtroPareja.value);
  if (filtroPareja.value === "si" && filtroAniversarioDesde.value)
    params.set("aniversario_desde", filtroAniversarioDesde.value);
  if (filtroPareja.value === "si" && filtroAniversarioHasta.value)
    params.set("aniversario_hasta", filtroAniversarioHasta.value);
  if (filtroEdadMin.value) params.set("edad_min", filtroEdadMin.value);
  if (filtroEdadMax.value) params.set("edad_max", filtroEdadMax.value);

  const res = await fetch(`/api/clientes?${params.toString()}`, { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }

  clientesActuales = await res.json();
  renderizarTablaClientes();
}

let ordenEdad = null; // null | "asc" | "desc"

function ordenarClientesParaTabla() {
  if (!ordenEdad) return clientesActuales;
  const copia = [...clientesActuales];
  copia.sort((a, b) => {
    const edadA = calcularEdad(a.fecha_nacimiento) ?? -1;
    const edadB = calcularEdad(b.fecha_nacimiento) ?? -1;
    return ordenEdad === "asc" ? edadA - edadB : edadB - edadA;
  });
  return copia;
}

function renderizarTablaClientes() {
  resumen.textContent = `${clientesActuales.length} cliente(s) encontrados`;

  const iconoOrden = document.querySelector("#th-edad .orden-icono");
  iconoOrden.textContent = ordenEdad === "asc" ? "▲" : ordenEdad === "desc" ? "▼" : "";

  tabla.innerHTML = ordenarClientesParaTabla()
    .map(
      (c) => `
    <tr data-row-id="${c.id}">
      <td>${escapeHtml(c.nombre)}</td>
      <td>${escapeHtml(formatearTelefono(c.telefono, c.pais))}</td>
      <td>${ETIQUETAS_DOCUMENTO[c.tipo_documento] || escapeHtml(c.tipo_documento)}: ${escapeHtml(c.cedula)}</td>
      <td>${escapeHtml(nombreCompletoPais(c.pais))}</td>
      <td>${escapeHtml(c.ciudad)}</td>
      <td>${calcularEdad(c.fecha_nacimiento)}</td>
      <td>${c.es_padre ? "Sí" : "No"}</td>
      <td>${c.tiene_pareja ? "Sí" : "No"}</td>
      <td>${ETIQUETAS_MEDIO[c.medio_contacto] || escapeHtml(c.medio_contacto)}</td>
      <td class="fila-acciones">
        <button type="button" class="btn-ver" data-id="${c.id}" title="Ver detalle">👁</button>
        <button type="button" class="btn-eliminar" data-id="${c.id}">Eliminar</button>
      </td>
    </tr>
  `
    )
    .join("");
}

document.getElementById("th-edad").addEventListener("click", () => {
  ordenEdad = ordenEdad === "asc" ? "desc" : ordenEdad === "desc" ? null : "asc";
  renderizarTablaClientes();
});

document.getElementById("th-edad").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    document.getElementById("th-edad").click();
  }
});

async function exportarClientesExcel() {
  if (clientesActuales.length === 0) {
    alert("No hay clientes para exportar con los filtros actuales");
    return;
  }

  const encabezados = [
    "Nombre",
    "Teléfono",
    "Tipo documento",
    "Documento",
    "Correo",
    "País",
    "Ciudad",
    "Género",
    "Fecha nacimiento",
    "Edad",
    "Es padre",
    "Tiene pareja",
    "Fecha aniversario",
    "Medio contacto",
  ];

  const filas = ordenarClientesParaTabla().map((c) => [
    c.nombre,
    c.telefono,
    ETIQUETAS_DOCUMENTO[c.tipo_documento] || c.tipo_documento,
    c.cedula,
    c.correo,
    nombreCompletoPais(c.pais),
    c.ciudad,
    ETIQUETAS_GENERO[c.genero] || c.genero,
    formatearFecha(c.fecha_nacimiento),
    calcularEdad(c.fecha_nacimiento),
    c.es_padre ? "Sí" : "No",
    c.tiene_pareja ? "Sí" : "No",
    formatearFecha(c.fecha_aniversario),
    ETIQUETAS_MEDIO[c.medio_contacto] || c.medio_contacto,
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
  XLSX.utils.book_append_sheet(libro, hoja, "Clientes");

  const fecha = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(libro, `clientes-coyote-${fecha}.xlsx`);
}

function limpiarFormulario() {
  formCliente.reset();
  modalError.textContent = "";
}

function abrirModalNuevo() {
  limpiarFormulario();
  modalTitulo.textContent = "Agregar cliente";
  modal.showModal();
}

function verDetalleCliente(id) {
  const c = clientesActuales.find((cliente) => cliente.id === id);
  if (!c) return;

  detalleTitulo.textContent = c.nombre;

  const filas = [
    ["Teléfono", c.telefono],
    ["Tipo y número de documento", `${ETIQUETAS_DOCUMENTO[c.tipo_documento] || c.tipo_documento}: ${c.cedula}`],
    ["Correo", c.correo],
    ["País", nombreCompletoPais(c.pais)],
    ["Ciudad", c.ciudad],
    ["Género", ETIQUETAS_GENERO[c.genero] || c.genero],
    ["Fecha de nacimiento", formatearFecha(c.fecha_nacimiento)],
    ["Edad", calcularEdad(c.fecha_nacimiento)],
    ["¿Es padre/madre?", c.es_padre ? "Sí" : "No"],
    ["¿Tiene pareja?", c.tiene_pareja ? "Sí" : "No"],
    ["Fecha de aniversario", formatearFecha(c.fecha_aniversario) || "—"],
    ["Medio de contacto", ETIQUETAS_MEDIO[c.medio_contacto] || c.medio_contacto],
    ["Recibir novedades", c.recibir_novedades ? "Sí" : "No"],
    ["Registrado", formatearFecha(c.fecha_registro)],
  ];

  detalleContenido.innerHTML = filas
    .map(
      ([etiqueta, valor]) => `
      <div class="detalle-campo">
        <span class="detalle-etiqueta">${escapeHtml(etiqueta)}</span>
        <span class="detalle-valor">${escapeHtml(valor)}</span>
      </div>`
    )
    .join("");

  modalDetalle.showModal();
}

async function eliminarCliente(id) {
  const cliente = clientesActuales.find((c) => c.id === id);
  const fila = tabla.querySelector(`tr[data-row-id="${id}"]`);
  if (fila) fila.classList.add("fila-por-eliminar");

  const nombre = cliente ? cliente.nombre : "este cliente";
  const documento = cliente
    ? `${ETIQUETAS_DOCUMENTO[cliente.tipo_documento] || cliente.tipo_documento}: ${cliente.cedula}`
    : "";
  const confirmado = confirm(
    `¿Eliminar a "${nombre}"${documento ? ` (${documento})` : ""}? Se moverá a la papelera y podrás restaurarlo durante 30 días, luego se borrará solo.`
  );

  if (!confirmado) {
    if (fila) fila.classList.remove("fila-por-eliminar");
    return;
  }

  const res = await fetch(`/api/clientes/${id}`, { method: "DELETE", credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  if (!res.ok) {
    if (fila) fila.classList.remove("fila-por-eliminar");
    alert("No se pudo eliminar el cliente");
    return;
  }
  cargarClientes();
  cargarEstadisticas();
  cargarClientesDelMes();
  cargarPapelera();
}

const tablaPapelera = document.getElementById("tabla-papelera");
const resumenPapelera = document.getElementById("resumen-papelera");
let papeleraActual = [];

function actualizarBadgePapelera(cantidad) {
  const badge = document.getElementById("badge-papelera");
  badge.textContent = cantidad > 99 ? "99+" : String(cantidad);
  badge.classList.toggle("is-oculto", cantidad === 0);
}

async function cargarPapelera() {
  const res = await fetch("/api/clientes/papelera", { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  const data = await res.json();
  papeleraActual = data.clientes;
  actualizarBadgePapelera(papeleraActual.length);

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
}

async function restaurarCliente(id) {
  const cliente = papeleraActual.find((c) => c.id === id);
  const nombre = cliente ? cliente.nombre : "este cliente";
  if (!confirm(`¿Restaurar a "${nombre}"? Volverá a aparecer en la lista de clientes.`)) return;

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
  if (
    !confirm(
      `¿Eliminar definitivamente a "${nombre}"${documento ? ` (${documento})` : ""}? Esta acción NO se puede deshacer.`
    )
  )
    return;

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

formCliente.addEventListener("submit", async (event) => {
  event.preventDefault();
  modalError.textContent = "";
  const datos = new FormData(formCliente);

  const payload = {
    nombre: datos.get("nombre").trim(),
    telefono: datos.get("telefono").trim(),
    tipo_documento: datos.get("tipo_documento"),
    cedula: datos.get("cedula").trim(),
    correo: datos.get("correo").trim(),
    pais: datos.get("pais").trim().toUpperCase(),
    ciudad: datos.get("ciudad").trim(),
    genero: datos.get("genero"),
    fecha_nacimiento: datos.get("fecha_nacimiento"),
    es_padre: datos.get("es_padre") === "si",
    tiene_pareja: datos.get("tiene_pareja") === "si",
    fecha_aniversario: datos.get("fecha_aniversario") || null,
    medio_contacto: datos.get("medio_contacto"),
    recibir_novedades: datos.get("recibir_novedades") === "on",
    mayor_edad: datos.get("mayor_edad") === "on",
    habeas_data: datos.get("habeas_data") === "on",
  };

  const res = await fetch("/api/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    modalError.textContent = (data.errores && data.errores[0]) || "No se pudo guardar el cliente";
    return;
  }

  modal.close();
  cargarClientes();
  cargarEstadisticas();
  cargarClientesDelMes();
});

tabla.addEventListener("click", (event) => {
  const id = Number(event.target.dataset.id);
  if (!id) return;

  if (event.target.classList.contains("btn-ver")) {
    verDetalleCliente(id);
  } else if (event.target.classList.contains("btn-eliminar")) {
    eliminarCliente(id);
  }
});

document.getElementById("btn-nuevo").addEventListener("click", abrirModalNuevo);
document.getElementById("btn-cancelar").addEventListener("click", () => modal.close());
document.getElementById("btn-cerrar-detalle").addEventListener("click", () => modalDetalle.close());

document.getElementById("logout-btn").addEventListener("click", async () => {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  window.location.href = "login.html";
});

let temporizadorNombre = null;
filtroNombre.addEventListener("input", () => {
  clearTimeout(temporizadorNombre);
  temporizadorNombre = setTimeout(cargarClientes, 350);
});

let temporizadorCiudad = null;
filtroCiudad.addEventListener("input", () => {
  clearTimeout(temporizadorCiudad);
  temporizadorCiudad = setTimeout(cargarClientes, 350);
});

let temporizadorTelefono = null;
filtroTelefono.addEventListener("input", () => {
  clearTimeout(temporizadorTelefono);
  temporizadorTelefono = setTimeout(cargarClientes, 350);
});

let temporizadorDocumento = null;
filtroDocumento.addEventListener("input", () => {
  clearTimeout(temporizadorDocumento);
  temporizadorDocumento = setTimeout(cargarClientes, 350);
});

filtroTipoDocumento.addEventListener("change", cargarClientes);
filtroGenero.addEventListener("change", cargarClientes);
filtroMedio.addEventListener("change", cargarClientes);
filtroPadre.addEventListener("change", cargarClientes);
filtroPareja.addEventListener("change", () => {
  actualizarVisibilidadAniversario();
  cargarClientes();
});
filtroAniversarioDesde.addEventListener("change", cargarClientes);
filtroAniversarioHasta.addEventListener("change", cargarClientes);
filtroEdadMin.addEventListener("change", cargarClientes);
filtroEdadMax.addEventListener("change", cargarClientes);

document.getElementById("btn-limpiar-filtros").addEventListener("click", () => {
  CAMPOS_FILTRO.forEach((campo) => (campo.value = ""));
  buscadorClientes.value = "";
  actualizarCiudadesFiltro("");
  actualizarVisibilidadAniversario();
  cargarClientes();
});

let temporizadorBusqueda = null;
buscadorClientes.addEventListener("input", () => {
  clearTimeout(temporizadorBusqueda);
  temporizadorBusqueda = setTimeout(cargarClientes, 300);
});

document.getElementById("btn-exportar").addEventListener("click", exportarClientesExcel);

mostrarFechaHoy();
setupFiltroPaisCiudad();
const modalPaisListo = setupModalPaisAutocomplete();
verificarSesion().then(() => {
  cargarClientes();
  cargarEstadisticas();
  cargarClientesDelMes();
  cargarPapelera();
});
