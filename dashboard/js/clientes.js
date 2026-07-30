// Pestaña Clientes: tabla, filtros/búsqueda, alta de cliente, detalle,
// selección múltiple y borrado (con contraseña de confirmación).
import { confirmarAccion } from "./modales.js";
import { cargarEstadisticas, cargarClientesDelMes } from "./resumen.js";
import { cargarPapelera } from "./papelera.js";
import {
  escapeHtml,
  ETIQUETAS_DOCUMENTO,
  ETIQUETAS_GENERO,
  ETIQUETAS_MEDIO,
  nombreCompletoPais,
  formatearFecha,
  calcularEdad,
} from "./utils.js";

// ---- Filtros colapsables ----

const toggleFiltros = document.getElementById("toggle-filtros");
const filtrosCuerpo = document.getElementById("filtros-cuerpo");
const filtersPanel = document.getElementById("filters-panel");

toggleFiltros.addEventListener("click", () => {
  const expandido = toggleFiltros.getAttribute("aria-expanded") === "true";
  toggleFiltros.setAttribute("aria-expanded", String(!expandido));
  filtrosCuerpo.classList.toggle("is-collapsed", expandido);
  filtersPanel.classList.toggle("is-collapsed", expandido);
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
const filtroNovedades = document.getElementById("filtro-novedades");
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
  filtroNovedades,
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

export async function setupFiltroPaisCiudad() {
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

export async function setupModalPaisAutocomplete() {
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
  novedades: filtroNovedades,
  medio: filtroMedio,
  genero: filtroGenero,
};

export function aplicarFiltroDesdeResumen(campo, valor) {
  const campoFiltro = FILTROS_RESUMEN[campo];
  if (!campoFiltro) return;

  CAMPOS_FILTRO.forEach((elemento) => (elemento.value = ""));
  buscadorClientes.value = "";
  campoFiltro.value = valor;
  cargarClientes();
}

// El rango de edad no es un único campo con valor fijo (como pareja/genero):
// llega como texto "18-24" o "65+" y hay que traducirlo a edad_min/edad_max.
export function aplicarFiltroEdadDesdeResumen(rango) {
  CAMPOS_FILTRO.forEach((elemento) => (elemento.value = ""));
  buscadorClientes.value = "";

  if (rango.endsWith("+")) {
    filtroEdadMin.value = rango.slice(0, -1);
    filtroEdadMax.value = "";
  } else {
    const [min, max] = rango.split("-");
    filtroEdadMin.value = min;
    filtroEdadMax.value = max;
  }

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
const seleccionados = new Set();

const accionesMasivas = document.getElementById("acciones-masivas");
const contadorSeleccionados = document.getElementById("contador-seleccionados");
const checkboxTodos = document.getElementById("checkbox-todos");

function actualizarAccionesMasivas() {
  accionesMasivas.classList.toggle("is-oculto", seleccionados.size === 0);
  contadorSeleccionados.textContent = `${seleccionados.size} seleccionado(s)`;
  const idsVisibles = clientesActuales.map((c) => c.id);
  const todosSeleccionados = idsVisibles.length > 0 && idsVisibles.every((id) => seleccionados.has(id));
  checkboxTodos.checked = todosSeleccionados;
  checkboxTodos.indeterminate = !todosSeleccionados && idsVisibles.some((id) => seleccionados.has(id));
}

export async function cargarClientes() {
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
  if (filtroNovedades.value) params.set("recibir_novedades", filtroNovedades.value);
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
  const idsVisibles = new Set(clientesActuales.map((c) => c.id));
  for (const id of seleccionados) {
    if (!idsVisibles.has(id)) seleccionados.delete(id);
  }
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
      <td class="th-checkbox"><input type="checkbox" class="checkbox-fila" data-id="${c.id}" aria-label="Seleccionar ${escapeHtml(c.nombre)}" ${seleccionados.has(c.id) ? "checked" : ""} /></td>
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
      </td>
    </tr>
  `
    )
    .join("");

  actualizarAccionesMasivas();
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
  }
});

tabla.addEventListener("change", (event) => {
  if (!event.target.classList.contains("checkbox-fila")) return;
  const id = Number(event.target.dataset.id);
  if (!id) return;
  if (event.target.checked) {
    seleccionados.add(id);
  } else {
    seleccionados.delete(id);
  }
  actualizarAccionesMasivas();
});

checkboxTodos.addEventListener("change", () => {
  if (checkboxTodos.checked) {
    clientesActuales.forEach((c) => seleccionados.add(c.id));
  } else {
    clientesActuales.forEach((c) => seleccionados.delete(c.id));
  }
  renderizarTablaClientes();
});

document.getElementById("btn-eliminar-seleccionados").addEventListener("click", async () => {
  const cantidad = seleccionados.size;
  if (cantidad === 0) return;

  let mensaje;
  if (cantidad === 1) {
    const id = [...seleccionados][0];
    const cliente = clientesActuales.find((c) => c.id === id);
    const nombre = cliente ? cliente.nombre : "este cliente";
    const documento = cliente
      ? `${ETIQUETAS_DOCUMENTO[cliente.tipo_documento] || cliente.tipo_documento}: ${cliente.cedula}`
      : "";
    mensaje = `¿Eliminar a "${nombre}"${
      documento ? ` (${documento})` : ""
    }? Se moverá a la papelera y podrás restaurarlo durante 30 días, luego se borrará solo.`;
  } else {
    mensaje = `¿Eliminar ${cantidad} clientes seleccionados? Se moverán a la papelera y podrás restaurarlos durante 30 días, luego se borrarán solos.`;
  }

  const confirmado = await confirmarAccion(mensaje, {
    titulo: cantidad === 1 ? "Eliminar cliente" : "Eliminar seleccionados",
    textoAceptar: "Eliminar",
    requierePassword: true,
  });
  if (!confirmado) return;

  const res = await fetch("/api/clientes/eliminar-multiple", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ids: [...seleccionados] }),
  });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  seleccionados.clear();
  cargarClientes();
  cargarEstadisticas();
  cargarClientesDelMes();
  cargarPapelera();
});

document.getElementById("btn-nuevo").addEventListener("click", abrirModalNuevo);
document.getElementById("btn-cancelar").addEventListener("click", () => modal.close());
document.getElementById("btn-cerrar-detalle").addEventListener("click", () => modalDetalle.close());

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
