document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-coyote");
  const status = document.getElementById("form-status");

  setupAccordion();
  setupAniversarioCondicional();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors(form);

    const errors = validarFormulario(form);

    if (Object.keys(errors).length > 0) {
      mostrarErrores(errors);
      status.textContent = "Por favor corrige los campos marcados.";
      status.className = "form-status error";
      const primerCampo = document.getElementById(Object.keys(errors)[0]);
      if (primerCampo) primerCampo.focus();
      return;
    }

    status.textContent = "¡Gracias por registrarte! Muy pronto un asesor te contactará.";
    status.className = "form-status success";
    form.reset();
    resetAniversarioCondicional();
  });
});

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
  if (!nombre) errors["nombre"] = "Ingresa tu nombre completo.";

  const telefono = form.telefono.value.trim();
  if (!/^[0-9]{7,10}$/.test(telefono)) {
    errors["telefono"] = "Ingresa un número de teléfono válido (7 a 10 dígitos).";
  }

  const cedula = form.cedula.value.trim();
  if (!/^[0-9]{5,10}$/.test(cedula)) {
    errors["cedula"] = "Ingresa un número de cédula válido.";
  }

  const correo = form.correo.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errors["correo"] = "Ingresa un correo electrónico válido.";
  } else {
    const dominioSugerido = sugerirDominio(correo.split("@")[1]);
    if (dominioSugerido) {
      errors["correo"] = `¿Quisiste decir "${correo.split("@")[0]}@${dominioSugerido}"?`;
    }
  }

  const ciudad = form.ciudad.value.trim();
  if (!ciudad) errors["ciudad"] = "Ingresa tu ciudad de residencia.";

  if (!form.genero.value) errors["genero"] = "Selecciona una opción.";

  const fechaNacimiento = form.fecha_nacimiento.value;
  if (!fechaNacimiento) {
    errors["fecha-nacimiento"] = "Ingresa tu fecha de nacimiento.";
  } else if (new Date(fechaNacimiento) > new Date()) {
    errors["fecha-nacimiento"] = "La fecha de nacimiento no puede ser futura.";
  } else if (calcularEdad(fechaNacimiento) < 18) {
    errors["fecha-nacimiento"] = "Debes ser mayor de edad para participar.";
  }

  if (!form.es_padre.value) errors["es-padre"] = "Selecciona una opción.";

  if (!form.tiene_pareja.value) {
    errors["tiene-pareja"] = "Selecciona una opción.";
  } else if (form.tiene_pareja.value === "si" && !form.fecha_aniversario.value) {
    errors["fecha-aniversario"] = "Ingresa la fecha de tu aniversario.";
  }

  if (!form.medio_contacto.value) errors["medio-contacto"] = "Selecciona una opción.";

  if (!form.mayor_edad.checked) {
    errors["mayor-edad"] = "Debes confirmar que eres mayor de edad.";
  }

  if (!form.habeas_data.checked) {
    errors["habeas-data"] = "Debes autorizar el tratamiento de tus datos personales.";
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

function clearErrors(form) {
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  form.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
}
