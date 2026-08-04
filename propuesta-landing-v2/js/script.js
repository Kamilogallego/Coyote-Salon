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

document.querySelectorAll(".reveal").forEach((el) => observador.observe(el));

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
  const abrirLightbox = (foto) => {
    lightboxImg.src = foto.dataset.full;
    lightboxImg.alt = foto.querySelector("img").alt;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-abierto");
  };
  const cerrarLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.classList.remove("lightbox-abierto");
  };

  document.querySelectorAll(".carrusel-item").forEach((foto) => {
    foto.addEventListener("click", () => abrirLightbox(foto));
  });

  lightbox.querySelectorAll("[data-cerrar-lightbox]").forEach((el) => {
    el.addEventListener("click", cerrarLightbox);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !lightbox.hidden) cerrarLightbox();
  });
}

document.querySelectorAll(".puerta-toggle").forEach((boton) => {
  boton.addEventListener("click", () => {
    const puerta = boton.closest(".puerta");
    const abierta = puerta.classList.contains("abierta");

    document.querySelectorAll(".puerta.abierta").forEach((otra) => {
      if (otra !== puerta) {
        otra.classList.remove("abierta");
        otra.querySelector(".puerta-toggle").setAttribute("aria-expanded", "false");
      }
    });

    puerta.classList.toggle("abierta", !abierta);
    boton.setAttribute("aria-expanded", String(!abierta));
  });
});

const INICIADO_EN = Date.now();

const CAMPOS_POR_TIPO = {
  "panel-empleo": {
    tipo: "empleo",
    honeypot: "e-sitio-web",
    error: "e-error",
    campos: { nombre: "e-nombre", telefono: "e-telefono", correo: "e-correo", categoria: "e-cargo" },
  },
  "panel-servicios": {
    tipo: "artista",
    honeypot: "s-sitio-web",
    error: "s-error",
    campos: {
      nombre: "s-nombre",
      telefono: "s-telefono",
      correo: "s-correo",
      categoria: "s-tipo",
      portafolio: "s-portafolio",
    },
  },
  "panel-proveedores": {
    tipo: "proveedor",
    honeypot: "p-sitio-web",
    error: "p-error",
    campos: {
      nombre: "p-empresa",
      contacto: "p-contacto",
      telefono: "p-telefono",
      correo: "p-correo",
      categoria: "p-que",
    },
  },
};

document.querySelectorAll(".puerta-form").forEach((form) => {
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

    const payload = { tipo: config.tipo, sitio_web: document.getElementById(config.honeypot)?.value || "", iniciado_en: INICIADO_EN };
    for (const [campo, id] of Object.entries(config.campos)) {
      payload[campo] = document.getElementById(id).value.trim();
    }

    botonEnviar.disabled = true;
    try {
      const respuesta = await fetch("/api/solicitudes", {
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
