if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const intro = document.getElementById("intro");
function terminarIntro() {
  if (!intro) return;
  intro.classList.add("terminado");
  document.body.classList.remove("intro-activa");
  setTimeout(() => {
    intro.style.display = "none";
  }, 550);
}

if (!intro || reduceMotion) {
  if (intro) intro.style.display = "none";
  document.body.classList.remove("intro-activa");
} else {
  requestAnimationFrame(() => intro.classList.add("jugar"));
  intro.addEventListener("click", terminarIntro, { once: true });
  setTimeout(terminarIntro, 2000);
}

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("con-scroll", window.scrollY > 40);
});

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("en-vista");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal, .video-revela").forEach((el) => observador.observe(el));

document.querySelectorAll(".carrusel-item").forEach((el, indice) => {
  el.style.setProperty("--i", indice);
  observador.observe(el);
});

document.querySelectorAll(".sobre-video, .comunidad-video").forEach((video) => {
  if (reduceMotion) {
    video.removeAttribute("autoplay");
    video.pause();
  }
});

const carrusel = document.getElementById("carrusel-galeria");
const mapaClones = new Map();
if (carrusel) {
  const originales = Array.from(carrusel.querySelectorAll(".carrusel-item"));
  const NUM_CLONES = Math.min(3, originales.length);

  const crearClon = (item, indiceOriginal) => {
    const clon = item.cloneNode(true);
    clon.classList.add("carrusel-clon");
    clon.setAttribute("aria-hidden", "true");
    clon.tabIndex = -1;
    mapaClones.set(clon, indiceOriginal);
    return clon;
  };

  const primerItemOriginal = carrusel.firstChild;
  originales.slice(-NUM_CLONES).forEach((item) => {
    carrusel.insertBefore(crearClon(item, originales.indexOf(item)), primerItemOriginal);
  });
  originales.slice(0, NUM_CLONES).forEach((item) => {
    carrusel.appendChild(crearClon(item, originales.indexOf(item)));
  });

  const desplazar = () => originales[0].getBoundingClientRect().width + 16;
  const anchoTotalOriginales = () => desplazar() * originales.length;

  carrusel.scrollLeft = originales[0].offsetLeft;

  document.querySelector(".carrusel-anterior")?.addEventListener("click", () => {
    carrusel.scrollBy({ left: -desplazar(), behavior: "smooth" });
  });
  document.querySelector(".carrusel-siguiente")?.addEventListener("click", () => {
    carrusel.scrollBy({ left: desplazar(), behavior: "smooth" });
  });

  let temporizadorLoop;
  carrusel.addEventListener("scroll", () => {
    clearTimeout(temporizadorLoop);
    temporizadorLoop = setTimeout(() => {
      const inicioReal = originales[0].offsetLeft;
      const finReal = originales[originales.length - 1].offsetLeft + desplazar();
      if (carrusel.scrollLeft >= finReal) {
        carrusel.scrollLeft -= anchoTotalOriginales();
      } else if (carrusel.scrollLeft < inicioReal - 1) {
        carrusel.scrollLeft += anchoTotalOriginales();
      }
    }, 120);
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
if (lightbox && lightboxImg) {
  const fotos = Array.from(document.querySelectorAll(".carrusel-item:not(.carrusel-clon)"));
  let indiceActual = 0;

  const mostrarFoto = (indice) => {
    indiceActual = (indice + fotos.length) % fotos.length;
    const foto = fotos[indiceActual];
    lightboxImg.src = foto.dataset.full;
    lightboxImg.alt = foto.querySelector("img").alt;
  };

  const abrirLightbox = (foto) => {
    mostrarFoto(fotos.indexOf(foto));
    lightbox.hidden = false;
    document.body.classList.add("lightbox-abierto");
  };
  const cerrarLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.classList.remove("lightbox-abierto");
  };

  document.querySelectorAll(".carrusel-item").forEach((foto) => {
    foto.addEventListener("click", () => {
      const indiceOriginal = mapaClones.get(foto);
      abrirLightbox(indiceOriginal === undefined ? foto : fotos[indiceOriginal]);
    });
  });

  lightbox.querySelectorAll("[data-cerrar-lightbox]").forEach((el) => {
    el.addEventListener("click", cerrarLightbox);
  });

  document.querySelector(".lightbox-anterior")?.addEventListener("click", () => mostrarFoto(indiceActual - 1));
  document.querySelector(".lightbox-siguiente")?.addEventListener("click", () => mostrarFoto(indiceActual + 1));

  document.addEventListener("keydown", (evento) => {
    if (lightbox.hidden) return;
    if (evento.key === "Escape") cerrarLightbox();
    if (evento.key === "ArrowLeft") mostrarFoto(indiceActual - 1);
    if (evento.key === "ArrowRight") mostrarFoto(indiceActual + 1);
  });
}

document.querySelectorAll(".puerta-toggle").forEach((boton) => {
  boton.addEventListener("click", () => {
    const puerta = boton.closest(".puerta");
    const grupo = puerta.closest(".puertas-grid");
    const abierta = puerta.classList.contains("abierta");
    const vaAAbrir = !abierta;

    grupo.querySelectorAll(".puerta").forEach((otra) => {
      if (otra !== puerta) {
        otra.classList.remove("abierta");
        otra.classList.toggle("minimizada", vaAAbrir);
        otra.querySelector(".puerta-toggle").setAttribute("aria-expanded", "false");
      }
    });

    puerta.classList.toggle("abierta", vaAAbrir);
    puerta.classList.remove("minimizada");
    boton.setAttribute("aria-expanded", String(vaAAbrir));
  });
});

const INICIADO_EN = Date.now();

const CAMPOS_POR_TIPO = {
  "panel-empleo": {
    endpoint: "empleo",
    honeypot: "e-sitio-web",
    error: "e-error",
    campos: {
      nombre: "e-nombre",
      telefono: "e-telefono",
      correo: "e-correo",
      documento_tipo: "e-documento-tipo",
      documento_numero: "e-documento-numero",
      cargo: "e-cargo",
      experiencia: "e-experiencia",
    },
  },
  "panel-proveedores": {
    endpoint: "proveedores",
    honeypot: "p-sitio-web",
    error: "p-error",
    campos: {
      nombre_empresa: "p-empresa",
      contacto: "p-contacto",
      telefono: "p-telefono",
      correo: "p-correo",
      documento_tipo: "p-documento-tipo",
      documento_numero: "p-documento-numero",
      que_suministra: "p-que",
    },
  },
};

const NUMERO_WHATSAPP = "573007828594";

const ETIQUETAS_DOCUMENTO_WA = { cedula: "Cédula de ciudadanía", cedula_extranjeria: "Cédula de extranjería", pasaporte: "Pasaporte" };

const queOtroSelect = document.getElementById("p-que");
const queOtroCampo = document.getElementById("p-que-otro-campo");
const queOtroInput = document.getElementById("p-que-otro");
queOtroSelect?.addEventListener("change", () => {
  const esOtro = queOtroSelect.value === "Otro";
  queOtroCampo.classList.toggle("is-oculto", !esOtro);
  queOtroInput.required = esOtro;
});

document.querySelectorAll(".puerta-form").forEach((form) => {
  if (form.id === "panel-eventos") {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const nombre = document.getElementById("v-nombre").value.trim();
      const telefono = document.getElementById("v-telefono").value.trim();
      const documentoTipo = ETIQUETAS_DOCUMENTO_WA[document.getElementById("v-documento-tipo").value] || "";
      const documentoNumero = document.getElementById("v-documento-numero").value.trim();
      const tipo = document.getElementById("v-tipo").value;
      const invitados = document.getElementById("v-invitados").value.trim();
      const mensaje = `Hola, soy ${nombre}, ${documentoTipo} ${documentoNumero}, mi teléfono es ${telefono}. Quiero cotizar un evento (${tipo}) para aprox. ${invitados} invitados.`;
      window.open(`https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
      form.closest(".puerta").classList.add("enviada");
    });
    return;
  }

  if (form.id === "panel-reserva") {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const nombre = document.getElementById("r-nombre").value.trim();
      const telefono = document.getElementById("r-telefono").value.trim();
      const documentoTipo = ETIQUETAS_DOCUMENTO_WA[document.getElementById("r-documento-tipo").value] || "";
      const documentoNumero = document.getElementById("r-documento-numero").value.trim();
      const fecha = document.getElementById("r-fecha").value;
      const hora = document.getElementById("r-hora").value;
      const personas = document.getElementById("r-personas").value.trim();
      const mensaje = `Hola, soy ${nombre}, ${documentoTipo} ${documentoNumero}, mi teléfono es ${telefono}. Quiero reservar mesa para ${personas} personas el ${fecha} a las ${hora}.`;
      window.open(`https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
      form.closest(".puerta").classList.add("enviada");
    });
    return;
  }

  const config = CAMPOS_POR_TIPO[form.id];

  if (!config) {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      form.closest(".puerta").classList.add("enviada");
    });
    return;
  }

  const errorEl = document.getElementById(config.error);
  const botonEnviar = form.querySelector(".enviar");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (errorEl) errorEl.textContent = "";

    const payload = { sitio_web: document.getElementById(config.honeypot)?.value || "", iniciado_en: INICIADO_EN };
    for (const [campo, id] of Object.entries(config.campos)) {
      payload[campo] = document.getElementById(id).value.trim();
    }
    if (form.id === "panel-proveedores" && payload.que_suministra === "Otro") {
      payload.que_suministra = document.getElementById("p-que-otro").value.trim();
    }

    botonEnviar.disabled = true;
    try {
      const respuesta = await fetch(`/api/solicitudes/${config.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const datos = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        if (errorEl) errorEl.textContent = datos.errores?.[0] || "No pudimos enviar el formulario. Intenta de nuevo.";
        return;
      }

      form.closest(".puerta").classList.add("enviada");
    } catch {
      if (errorEl) errorEl.textContent = "No pudimos enviar el formulario. Revisa tu conexión e intenta de nuevo.";
    } finally {
      botonEnviar.disabled = false;
    }
  });
});
