const TRANSLATIONS = {
  es: {
    "header.title": "Sé parte de nuestra comunidad",
    "header.subtitle": "Regístrate",
    "section.personales": "Datos personales",
    "section.sobreti": "Sobre ti",
    "section.contacto": "Preferencias de contacto",
    "label.nombre": "Nombre completo",
    "label.telefono": "Número de teléfono",
    "label.tipoDocumento": "Tipo de documento",
    "label.cedula": "Número de documento",
    "label.correo": "Correo electrónico",
    "label.pais": "País",
    "label.ciudad": "Ciudad de residencia",
    "label.genero": "Género",
    "label.fechaNacimiento": "Fecha de nacimiento",
    "label.esPadre": "¿Eres padre?",
    "label.tienePareja": "¿Tienes pareja?",
    "label.fechaAniversario": "Fecha de tu aniversario",
    "label.medioContacto": "¿Cómo te gustaría que te contactemos?",
    "placeholder.telefono": "Ej: 3001234567",
    "hint.cedula": "Este dato es necesario para poder redimir tus puntos.",
    "hint.ciudad.sinPais": "Elige primero tu país para ver ciudades sugeridas.",
    "hint.ciudad.conSugerencias": "Elige una ciudad sugerida o escribe la tuya.",
    "hint.ciudad.sinSugerencias": "Escribe el nombre de tu ciudad.",
    "hint.ciudad.masCoincidencias": (n) => `Sigue escribiendo para afinar la búsqueda (${n} coincidencias)…`,
    "common.selecciona": "Selecciona una opción",
    "common.cargando": "Cargando países…",
    "common.si": "Sí",
    "common.no": "No",
    "common.enviar": "Enviar",
    "tipoDocumento.cedula": "Cédula de ciudadanía",
    "tipoDocumento.cedulaExtranjeria": "Cédula de extranjería",
    "tipoDocumento.pasaporte": "Pasaporte",
    "tipoDocumento.ppt": "Permiso por Protección Temporal (PPT)",
    "tipoDocumento.pep": "Permiso Especial de Permanencia (PEP)",
    "genero.femenino": "Femenino (F)",
    "genero.masculino": "Masculino (M)",
    "genero.noBinario": "No Binario (NB)",
    "genero.trans": "Trans (T)",
    "genero.otro": "Otro",
    "medioContacto.correo": "Correo electrónico",
    "medioContacto.llamada": "Llamada telefónica",
    "medioContacto.whatsapp": "WhatsApp / SMS",
    "medioContacto.ninguno": "No deseo ser contactado",
    "checkbox.mayorEdad": "Declaro que soy mayor de edad (18 años o más).",
    "checkbox.habeasIntro0": "Acepto los ",
    "checkbox.terminosLink": "Términos y Condiciones",
    "checkbox.habeasIntro": " y autorizo el tratamiento de mis datos personales conforme a la",
    "checkbox.habeasMid": " y el ",
    "checkbox.habeasEnd": "sobre Protección de Datos Personales (Habeas Data), según la ",
    "checkbox.habeasPoliticaLink": "Política de Tratamiento de Datos de Coyote Salón Social",
    "checkbox.novedades":
      "Sí, quiero enterarme de promociones, eventos y un beneficio especial en mi cumpleaños por correo y/o WhatsApp. Es opcional y puedo darme de baja cuando quiera (",
    "checkbox.novedadesPoliticaLink": "ver cómo",
    "checkbox.novedadesFin": ").",
    "status.errores": "Por favor corrige los campos marcados.",
    "status.exito": "¡Tu registro fue enviado correctamente!",
    "err.nombre": "Ingresa tu nombre completo.",
    "err.telefono": "Ingresa un número de teléfono válido.",
    "err.seleccionaOpcion": "Selecciona una opción.",
    "err.pasaporte": "Ingresa un número de documento válido (letras y números).",
    "err.documento": "Ingresa un número de documento válido.",
    "err.correo": "Ingresa un correo electrónico válido.",
    "err.correoSugerido": (usuario, dominio) => `¿Quisiste decir "${usuario}@${dominio}"?`,
    "err.ciudad": "Ingresa tu ciudad de residencia.",
    "err.fechaNacimientoVacia": "Ingresa tu fecha de nacimiento.",
    "err.fechaFutura": "La fecha de nacimiento no puede ser futura.",
    "err.menorEdad": "Debes ser mayor de edad para participar.",
    "err.fechaAniversario": "Ingresa la fecha de tu aniversario.",
    "err.mayorEdad": "Debes confirmar que eres mayor de edad.",
    "err.habeasData": "Debes autorizar el tratamiento de tus datos personales.",
    "iti.searchPlaceholder": "Buscar país",
  },
  en: {
    "header.title": "Be part of our community",
    "header.subtitle": "Sign up",
    "section.personales": "Personal details",
    "section.sobreti": "About you",
    "section.contacto": "Contact preferences",
    "label.nombre": "Full name",
    "label.telefono": "Phone number",
    "label.tipoDocumento": "Document type",
    "label.cedula": "Document number",
    "label.correo": "Email address",
    "label.pais": "Country",
    "label.ciudad": "City of residence",
    "label.genero": "Gender",
    "label.fechaNacimiento": "Date of birth",
    "label.esPadre": "Do you have children?",
    "label.tienePareja": "Do you have a partner?",
    "label.fechaAniversario": "Your anniversary date",
    "label.medioContacto": "How would you like us to contact you?",
    "placeholder.telefono": "E.g.: 3001234567",
    "hint.cedula": "This information is required to redeem your points.",
    "hint.ciudad.sinPais": "Choose your country first to see suggested cities.",
    "hint.ciudad.conSugerencias": "Pick a suggested city or type your own.",
    "hint.ciudad.sinSugerencias": "Type the name of your city.",
    "hint.ciudad.masCoincidencias": (n) => `Keep typing to narrow the search (${n} matches)…`,
    "common.selecciona": "Select an option",
    "common.cargando": "Loading countries…",
    "common.si": "Yes",
    "common.no": "No",
    "common.enviar": "Submit",
    "tipoDocumento.cedula": "National ID",
    "tipoDocumento.cedulaExtranjeria": "Foreign resident ID",
    "tipoDocumento.pasaporte": "Passport",
    "tipoDocumento.ppt": "Temporary Protection Permit (PPT)",
    "tipoDocumento.pep": "Special Residency Permit (PEP)",
    "genero.femenino": "Female (F)",
    "genero.masculino": "Male (M)",
    "genero.noBinario": "Non-binary (NB)",
    "genero.trans": "Trans (T)",
    "genero.otro": "Other",
    "medioContacto.correo": "Email",
    "medioContacto.llamada": "Phone call",
    "medioContacto.whatsapp": "WhatsApp / SMS",
    "medioContacto.ninguno": "I don't want to be contacted",
    "checkbox.mayorEdad": "I declare that I am of legal age (18 years or older).",
    "checkbox.habeasIntro0": "I accept the ",
    "checkbox.terminosLink": "Terms and Conditions",
    "checkbox.habeasIntro": " and I authorize the processing of my personal data in accordance with",
    "checkbox.habeasMid": " and ",
    "checkbox.habeasEnd": "on Personal Data Protection (Habeas Data), per the ",
    "checkbox.habeasPoliticaLink": "Coyote Salón Social Data Processing Policy",
    "checkbox.novedades":
      "Yes, I'd like to hear about promotions, events, and a special birthday treat by email and/or WhatsApp. It's optional and I can unsubscribe anytime (",
    "checkbox.novedadesPoliticaLink": "see how",
    "checkbox.novedadesFin": ").",
    "status.errores": "Please fix the highlighted fields.",
    "status.exito": "Your registration was submitted successfully!",
    "err.nombre": "Enter your full name.",
    "err.telefono": "Enter a valid phone number.",
    "err.seleccionaOpcion": "Select an option.",
    "err.pasaporte": "Enter a valid document number (letters and numbers).",
    "err.documento": "Enter a valid document number.",
    "err.correo": "Enter a valid email address.",
    "err.correoSugerido": (usuario, dominio) => `Did you mean "${usuario}@${dominio}"?`,
    "err.ciudad": "Enter your city of residence.",
    "err.fechaNacimientoVacia": "Enter your date of birth.",
    "err.fechaFutura": "Date of birth cannot be in the future.",
    "err.menorEdad": "You must be of legal age to participate.",
    "err.fechaAniversario": "Enter your anniversary date.",
    "err.mayorEdad": "You must confirm that you are of legal age.",
    "err.habeasData": "You must authorize the processing of your personal data.",
    "iti.searchPlaceholder": "Search country",
  },
};

let idiomaActual = localStorage.getItem("coyote-idioma") || "es";

function t(clave, ...args) {
  const valor = TRANSLATIONS[idiomaActual][clave];
  return typeof valor === "function" ? valor(...args) : valor;
}

let iti;
let actualizarCiudades = () => {};
let actualizarIdiomaPaisCiudad = () => {};

// ---- Borrador del formulario (para no perder lo escrito al abrir la política de privacidad) ----

const CLAVE_BORRADOR = "coyote-formulario-borrador";

function leerBorrador() {
  try {
    const crudo = localStorage.getItem(CLAVE_BORRADOR);
    return crudo ? JSON.parse(crudo) : null;
  } catch {
    return null;
  }
}

function borrarBorrador() {
  localStorage.removeItem(CLAVE_BORRADOR);
}

function guardarBorrador(form) {
  const datos = {
    nombre: form.nombre.value,
    telefonoLocal: form.telefono.value,
    telefonoPaisIso2: iti ? iti.getSelectedCountryData().iso2 : "",
    tipo_documento: form.tipo_documento.value,
    cedula: form.cedula.value,
    correo: form.correo.value,
    pais_codigo: document.getElementById("pais-codigo").value,
    pais_texto: document.getElementById("pais").value,
    ciudad: form.ciudad.value,
    genero: form.genero.value,
    fecha_nacimiento: form.fecha_nacimiento.value,
    es_padre: form.es_padre.value,
    tiene_pareja: form.tiene_pareja.value,
    fecha_aniversario: form.fecha_aniversario.value,
    medio_contacto: form.medio_contacto.value,
    recibir_novedades: form.recibir_novedades.checked,
    mayor_edad: form.mayor_edad.checked,
    habeas_data: form.habeas_data.checked,
  };
  localStorage.setItem(CLAVE_BORRADOR, JSON.stringify(datos));
}

function restaurarBorrador(form, datos) {
  form.nombre.value = datos.nombre || "";
  form.telefono.value = datos.telefonoLocal || "";
  form.tipo_documento.value = datos.tipo_documento || "";
  form.cedula.value = datos.cedula || "";
  form.correo.value = datos.correo || "";
  form.ciudad.value = datos.ciudad || "";
  form.genero.value = datos.genero || "";
  form.fecha_nacimiento.value = datos.fecha_nacimiento || "";
  form.es_padre.value = datos.es_padre || "";
  form.tiene_pareja.value = datos.tiene_pareja || "";
  form.fecha_aniversario.value = datos.fecha_aniversario || "";
  form.medio_contacto.value = datos.medio_contacto || "";
  form.recibir_novedades.checked = Boolean(datos.recibir_novedades);
  form.mayor_edad.checked = Boolean(datos.mayor_edad);
  form.habeas_data.checked = Boolean(datos.habeas_data);

  document.getElementById("pais-codigo").value = datos.pais_codigo || "";
  document.getElementById("pais").value = datos.pais_texto || "";

  if (iti && datos.telefonoPaisIso2) {
    iti.setCountry(datos.telefonoPaisIso2);
  }

  if (datos.tipo_documento) {
    document.getElementById("tipo-documento").dispatchEvent(new Event("change"));
  }
  if (datos.tiene_pareja === "si") {
    document.getElementById("tiene-pareja").dispatchEvent(new Event("change"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-coyote");
  const status = document.getElementById("form-status");

  setupAccordion();
  setupAniversarioCondicional();
  setupDocumentoCondicional();
  setupTelefono();
  const paisCiudadListo = setupPaisCiudad();
  setupIdioma();

  document.querySelectorAll(".checkbox-field label a").forEach((enlace) => {
    enlace.addEventListener("click", (event) => event.stopPropagation());
  });

  const borrador = leerBorrador();
  if (borrador) {
    restaurarBorrador(form, borrador);
    Promise.resolve(paisCiudadListo).then(() => {
      if (borrador.pais_codigo) actualizarCiudades(borrador.pais_codigo);
    });
  }

  let temporizadorBorrador = null;
  const guardarBorradorConDebounce = () => {
    clearTimeout(temporizadorBorrador);
    temporizadorBorrador = setTimeout(() => guardarBorrador(form), 300);
  };
  form.addEventListener("input", guardarBorradorConDebounce);
  form.addEventListener("change", guardarBorradorConDebounce);

  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.type !== "submit") {
      event.preventDefault();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form);

    const errors = validarFormulario(form);

    if (Object.keys(errors).length > 0) {
      mostrarErrores(errors);
      status.textContent = t("status.errores");
      status.className = "form-status error";
      const primerCampo = document.getElementById(Object.keys(errors)[0]);
      if (primerCampo) primerCampo.focus();
      return;
    }

    const submitBtn = form.querySelector(".submit-btn");
    submitBtn.disabled = true;

    try {
      const respuesta = await enviarRegistro(form);

      if (!respuesta.ok) {
        const data = await respuesta.json().catch(() => ({}));
        status.textContent = (data.errores && data.errores[0]) || t("status.errores");
        status.className = "form-status error";
        return;
      }

      status.textContent = t("status.exito");
      status.className = "form-status success";
      form.reset();
      resetAniversarioCondicional();
      if (iti) iti.setCountry("co");
      actualizarCiudades(form.pais.value);
      borrarBorrador();
    } catch (err) {
      status.textContent = t("status.errores");
      status.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
    }
  });
});

function setupIdioma() {
  const botones = document.querySelectorAll(".lang-btn");

  aplicarIdioma(idiomaActual);

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (boton.dataset.lang === idiomaActual) return;
      aplicarIdioma(boton.dataset.lang);
    });
  });
}

function aplicarIdioma(lang) {
  idiomaActual = lang;
  localStorage.setItem("coyote-idioma", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const clave = el.getAttribute("data-i18n");
    const valor = t(clave);
    if (valor != null) el.textContent = valor;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const clave = el.getAttribute("data-i18n-placeholder");
    const valor = t(clave);
    if (valor != null) el.placeholder = valor;
  });

  document.querySelectorAll(".lang-btn").forEach((boton) => {
    boton.setAttribute("aria-pressed", String(boton.dataset.lang === lang));
  });

  actualizarIdiomaPaisCiudad(lang);
  setupTelefono();
}

function setupTelefono() {
  const input = document.getElementById("telefono");
  const paisPrevio = iti ? iti.getSelectedCountryData().iso2 : "co";
  if (iti) iti.destroy();

  iti = window.intlTelInput(input, {
    initialCountry: paisPrevio,
    separateDialCode: true,
    preferredCountries: ["co", "mx", "ar", "cl", "pe", "es", "us"],
    i18n: { searchPlaceholder: t("iti.searchPlaceholder") },
  });
}

function setupAccordion() {
  const toggles = document.querySelectorAll(".accordion-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panel = document.getElementById(toggle.getAttribute("aria-controls"));
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isExpanded));
      panel.classList.toggle("is-collapsed", isExpanded);
    });
  });
}

const DOCUMENTOS_ALFANUMERICOS = ["pasaporte", "ppt", "pep"];

function setupDocumentoCondicional() {
  const tipoDocumento = document.getElementById("tipo-documento");
  const cedula = document.getElementById("cedula");

  function actualizarRestriccion() {
    const esAlfanumerico = DOCUMENTOS_ALFANUMERICOS.includes(tipoDocumento.value);
    cedula.setAttribute("inputmode", esAlfanumerico ? "text" : "numeric");
    const noPermitido = esAlfanumerico ? /[^A-Za-z0-9]/g : /[^0-9]/g;
    cedula.value = cedula.value.replace(noPermitido, "");
  }

  tipoDocumento.addEventListener("change", actualizarRestriccion);

  cedula.addEventListener("input", () => {
    const esAlfanumerico = DOCUMENTOS_ALFANUMERICOS.includes(tipoDocumento.value);
    const permitido = esAlfanumerico ? /[^A-Za-z0-9]/g : /[^0-9]/g;
    cedula.value = cedula.value.replace(permitido, "");
  });

  actualizarRestriccion();
}

function setupAniversarioCondicional() {
  const tienePareja = document.getElementById("tiene-pareja");
  const campoAniversario = document.getElementById("campo-aniversario");
  const inputAniversario = document.getElementById("fecha-aniversario");

  tienePareja.addEventListener("change", () => {
    const muestraCampo = tienePareja.value === "si";
    campoAniversario.classList.toggle("is-collapsed", !muestraCampo);
    inputAniversario.required = muestraCampo;
    if (!muestraCampo) inputAniversario.value = "";
  });
}

async function setupPaisCiudad() {
  const inputPais = document.getElementById("pais");
  const inputPaisCodigo = document.getElementById("pais-codigo");
  const listaPaisSugerencias = document.getElementById("pais-suggestions");

  const inputCiudad = document.getElementById("ciudad");
  const listaSugerencias = document.getElementById("ciudad-suggestions");
  const hint = document.getElementById("hint-ciudad");

  const { Country, State, City } = await import("https://esm.sh/country-state-city@3");
  const nombresPorIdioma = {
    es: new Intl.DisplayNames(["es"], { type: "region" }),
    en: new Intl.DisplayNames(["en"], { type: "region" }),
  };
  const codigosPaises = Country.getAllCountries().map((pais) => pais.isoCode);

  function opcionesPaisOrdenadas(lang) {
    return codigosPaises
      .map((code) => ({ code, nombre: nombresPorIdioma[lang].of(code) || code }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, lang));
  }

  let paisesActuales = opcionesPaisOrdenadas(idiomaActual);

  function nombrePorCodigo(code, lang) {
    const encontrado = opcionesPaisOrdenadas(lang).find((p) => p.code === code);
    return encontrado ? encontrado.nombre : code;
  }

  function seleccionarPais(code) {
    inputPaisCodigo.value = code;
    inputPais.value = nombrePorCodigo(code, idiomaActual);
    inputPais.classList.remove("invalid");
  }

  function ocultarSugerenciasPais() {
    listaPaisSugerencias.hidden = true;
    listaPaisSugerencias.innerHTML = "";
    inputPais.setAttribute("aria-expanded", "false");
  }

  function mostrarSugerenciasPais() {
    const texto = inputPais.value.trim().toLowerCase();
    const coincidencias = (
      texto ? paisesActuales.filter((p) => p.nombre.toLowerCase().includes(texto)) : paisesActuales
    ).slice(0, 200);

    if (coincidencias.length === 0) {
      ocultarSugerenciasPais();
      return;
    }

    listaPaisSugerencias.innerHTML = coincidencias
      .map((p) => `<li role="option" data-code="${p.code}">${p.nombre}</li>`)
      .join("");

    listaPaisSugerencias.hidden = false;
    inputPais.setAttribute("aria-expanded", "true");
  }

  listaPaisSugerencias.addEventListener("mousedown", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    event.preventDefault();
    seleccionarPais(li.dataset.code);
    ocultarSugerenciasPais();
    inputCiudad.value = "";
    actualizarCiudades(li.dataset.code);
  });

  inputPais.addEventListener("input", () => {
    inputPaisCodigo.value = "";
    mostrarSugerenciasPais();
  });
  inputPais.addEventListener("focus", mostrarSugerenciasPais);
  inputPais.addEventListener("blur", () => {
    ocultarSugerenciasPais();
    if (!inputPaisCodigo.value) {
      inputPais.value = "";
      actualizarCiudades("");
    }
  });

  const MAX_SUGERENCIAS_MOSTRADAS = 200;
  let ciudadesPais = [];

  function normalizarNombreCiudad(texto) {
    return texto
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/d\.?\s*c\.?/gi, "")
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase();
  }

  function ocultarSugerencias() {
    listaSugerencias.hidden = true;
    listaSugerencias.innerHTML = "";
    inputCiudad.setAttribute("aria-expanded", "false");
  }

  function mostrarSugerencias() {
    const texto = inputCiudad.value.trim().toLowerCase();
    const todasLasCoincidencias = texto
      ? ciudadesPais.filter((c) => c.toLowerCase().includes(texto))
      : ciudadesPais;
    const coincidencias = todasLasCoincidencias.slice(0, MAX_SUGERENCIAS_MOSTRADAS);

    if (coincidencias.length === 0) {
      ocultarSugerencias();
      return;
    }

    listaSugerencias.innerHTML = coincidencias
      .map((ciudad) => `<li role="option">${ciudad}</li>`)
      .join("");

    if (todasLasCoincidencias.length > coincidencias.length) {
      listaSugerencias.innerHTML += `<li class="autocomplete-hint">${t(
        "hint.ciudad.masCoincidencias",
        todasLasCoincidencias.length
      )}</li>`;
    }

    listaSugerencias.hidden = false;
    inputCiudad.setAttribute("aria-expanded", "true");
  }

  listaSugerencias.addEventListener("mousedown", (event) => {
    if (event.target.tagName === "LI" && !event.target.classList.contains("autocomplete-hint")) {
      event.preventDefault();
      inputCiudad.value = event.target.textContent;
      ocultarSugerencias();
    }
  });

  inputCiudad.addEventListener("input", mostrarSugerencias);
  inputCiudad.addEventListener("focus", mostrarSugerencias);
  inputCiudad.addEventListener("blur", ocultarSugerencias);

  function actualizarHint(codigoPais) {
    if (!codigoPais) {
      hint.textContent = t("hint.ciudad.sinPais");
    } else if (ciudadesPais.length > 0) {
      hint.textContent = t("hint.ciudad.conSugerencias");
    } else {
      hint.textContent = t("hint.ciudad.sinSugerencias");
    }
  }

  actualizarCiudades = (codigoPais) => {
    if (!codigoPais) {
      ciudadesPais = [];
    } else if (codigoPais === "CO") {
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
    ocultarSugerencias();
    actualizarHint(codigoPais);
  };

  actualizarIdiomaPaisCiudad = (lang) => {
    paisesActuales = opcionesPaisOrdenadas(lang);
    if (inputPaisCodigo.value) {
      inputPais.value = nombrePorCodigo(inputPaisCodigo.value, lang);
    }
    actualizarHint(inputPaisCodigo.value);
  };

  seleccionarPais("CO");
  actualizarCiudades("CO");
}

function resetAniversarioCondicional() {
  const campoAniversario = document.getElementById("campo-aniversario");
  const inputAniversario = document.getElementById("fecha-aniversario");
  campoAniversario.classList.add("is-collapsed");
  inputAniversario.required = false;
}

const DOMINIOS_COMUNES = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "yahoo.es",
  "icloud.com",
  "live.com",
];

function distanciaEdicion(a, b) {
  const filas = a.length + 1;
  const columnas = b.length + 1;
  const matriz = Array.from({ length: filas }, (_, i) => [i, ...Array(columnas - 1).fill(0)]);
  matriz[0] = Array.from({ length: columnas }, (_, j) => j);

  for (let i = 1; i < filas; i++) {
    for (let j = 1; j < columnas; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      matriz[i][j] = Math.min(
        matriz[i - 1][j] + 1,
        matriz[i][j - 1] + 1,
        matriz[i - 1][j - 1] + costo
      );
    }
  }
  return matriz[filas - 1][columnas - 1];
}

function sugerirDominio(dominio) {
  const dominioNormalizado = dominio.toLowerCase();
  if (DOMINIOS_COMUNES.includes(dominioNormalizado)) return null;

  for (const dominioComun of DOMINIOS_COMUNES) {
    const distancia = distanciaEdicion(dominioNormalizado, dominioComun);
    if (distancia > 0 && distancia <= 2) return dominioComun;
  }
  return null;
}

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const noHaCumplidoAnios =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (noHaCumplidoAnios) edad--;
  return edad;
}

function validarFormulario(form) {
  const errors = {};

  const nombre = form.nombre.value.trim();
  if (!nombre) errors["nombre"] = t("err.nombre");

  if (!form.telefono.value.trim() || !iti || !iti.isValidNumber()) {
    errors["telefono"] = t("err.telefono");
  }

  if (!form.tipo_documento.value) errors["tipo-documento"] = t("err.seleccionaOpcion");

  const cedula = form.cedula.value.trim();
  if (DOCUMENTOS_ALFANUMERICOS.includes(form.tipo_documento.value)) {
    if (!/^[A-Za-z0-9]{6,12}$/.test(cedula)) {
      errors["cedula"] = t("err.pasaporte");
    }
  } else if (!/^[0-9]{5,10}$/.test(cedula)) {
    errors["cedula"] = t("err.documento");
  }

  const correo = form.correo.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errors["correo"] = t("err.correo");
  } else {
    const dominioSugerido = sugerirDominio(correo.split("@")[1]);
    if (dominioSugerido) {
      errors["correo"] = t("err.correoSugerido", correo.split("@")[0], dominioSugerido);
    }
  }

  if (!form.pais.value) errors["pais"] = t("err.seleccionaOpcion");

  if (!form.ciudad.value.trim()) errors["ciudad"] = t("err.ciudad");

  if (!form.genero.value) errors["genero"] = t("err.seleccionaOpcion");

  const fechaNacimiento = form.fecha_nacimiento.value;
  if (!fechaNacimiento) {
    errors["fecha-nacimiento"] = t("err.fechaNacimientoVacia");
  } else if (new Date(fechaNacimiento) > new Date()) {
    errors["fecha-nacimiento"] = t("err.fechaFutura");
  } else if (calcularEdad(fechaNacimiento) < 18) {
    errors["fecha-nacimiento"] = t("err.menorEdad");
  }

  if (!form.es_padre.value) errors["es-padre"] = t("err.seleccionaOpcion");

  if (!form.tiene_pareja.value) {
    errors["tiene-pareja"] = t("err.seleccionaOpcion");
  } else if (form.tiene_pareja.value === "si" && !form.fecha_aniversario.value) {
    errors["fecha-aniversario"] = t("err.fechaAniversario");
  }

  if (!form.medio_contacto.value) errors["medio-contacto"] = t("err.seleccionaOpcion");

  if (!form.mayor_edad.checked) {
    errors["mayor-edad"] = t("err.mayorEdad");
  }

  if (!form.habeas_data.checked) {
    errors["habeas-data"] = t("err.habeasData");
  }

  return errors;
}

function mostrarErrores(errors) {
  Object.entries(errors).forEach(([campoId, mensaje]) => {
    const input = document.getElementById(campoId);
    const errorSpan = document.querySelector(`[data-error-for="${campoId}"]`);
    if (input) input.classList.add("invalid");
    if (errorSpan) errorSpan.textContent = mensaje;

    const panel = input ? input.closest(".accordion-panel") : null;
    if (panel && panel.classList.contains("is-collapsed")) {
      panel.classList.remove("is-collapsed");
      const toggle = document.querySelector(`[aria-controls="${panel.id}"]`);
      if (toggle) toggle.setAttribute("aria-expanded", "true");
    }
  });
}

function enviarRegistro(form) {
  const datos = new FormData(form);

  const payload = {
    nombre: datos.get("nombre").trim(),
    telefono: iti.getNumber(),
    tipo_documento: datos.get("tipo_documento"),
    cedula: datos.get("cedula").trim(),
    correo: datos.get("correo").trim(),
    pais: datos.get("pais"),
    ciudad: datos.get("ciudad").trim(),
    genero: datos.get("genero"),
    fecha_nacimiento: datos.get("fecha_nacimiento"),
    es_padre: datos.get("es_padre") === "si",
    tiene_pareja: datos.get("tiene_pareja") === "si",
    fecha_aniversario: datos.get("fecha_aniversario") || null,
    medio_contacto: datos.get("medio_contacto"),
    mayor_edad: datos.get("mayor_edad") === "on",
    habeas_data: datos.get("habeas_data") === "on",
    recibir_novedades: datos.get("recibir_novedades") === "on",
  };

  return fetch("/api/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function clearErrors(form) {
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  form.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
}
