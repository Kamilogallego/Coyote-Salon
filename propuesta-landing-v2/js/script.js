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
if (carrusel) {
  carrusel.scrollLeft = 0;
  const desplazar = () => carrusel.querySelector(".carrusel-item").getBoundingClientRect().width + 16;
  document.querySelector(".carrusel-anterior")?.addEventListener("click", () => {
    carrusel.scrollBy({ left: -desplazar(), behavior: "smooth" });
  });
  document.querySelector(".carrusel-siguiente")?.addEventListener("click", () => {
    carrusel.scrollBy({ left: desplazar(), behavior: "smooth" });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
if (lightbox && lightboxImg) {
  const fotos = Array.from(document.querySelectorAll(".carrusel-item"));
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

  fotos.forEach((foto) => {
    foto.addEventListener("click", () => abrirLightbox(foto));
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
    campos: { nombre: "e-nombre", telefono: "e-telefono", correo: "e-correo", cargo: "e-cargo" },
  },
  "panel-servicios": {
    endpoint: "artistas",
    honeypot: "s-sitio-web",
    error: "s-error",
    campos: {
      nombre: "s-nombre",
      telefono: "s-telefono",
      correo: "s-correo",
      tipo_servicio: "s-tipo",
      portafolio: "s-portafolio",
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
      que_suministra: "p-que",
    },
  },
};

const NUMERO_WHATSAPP = "573007828594";

document.querySelectorAll(".puerta-form").forEach((form) => {
  if (form.id === "panel-eventos") {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const nombre = document.getElementById("v-nombre").value.trim();
      const telefono = document.getElementById("v-telefono").value.trim();
      const tipo = document.getElementById("v-tipo").value;
      const invitados = document.getElementById("v-invitados").value.trim();
      const mensaje = `Hola, soy ${nombre}, mi teléfono es ${telefono}. Quiero cotizar un evento (${tipo}) para aprox. ${invitados} invitados.`;
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
