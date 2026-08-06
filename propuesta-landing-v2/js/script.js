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

const TRANSLATIONS = {
  es: {
    "nav.coyote": "Coyote",
    "nav.vermas": "Ver más",
    "nav.ubicacion": "Ubicación",
    "nav.unete": "Únete",
    "hero.eyebrow": "Armenia, Quindío",
    "hero.titulo": "Tacos, burritos, tequila y música sin etiqueta",
    "hero.parrafo": "El lugar de Armenia donde los tacos salen calientes, la casa se llena rápido y la noche se estira hasta que alguien apague la música.",
    "hero.boton1": "Únete a Coyote",
    "hero.boton2": "Ver más",
    "sobre.eyebrow": "Sobre Coyote",
    "sobre.titulo": "Taqueria Mex Mex",
    "sobre.parrafo": "Coyote es un salón social de tacos, burritos y micheladas en Armenia — de esos lugares donde llegas por la comida y te quedas por la música. Sillas plegables, mucho rojo y una barra que no para. Somos el equipo detrás de la barra, la cocina y la música: la gente que hace que cada noche en Coyote se sienta como estar en casa de un amigo.",
    "sobre.dato2": "Tacos, burritos & micheladas",
    "galeria.eyebrow": "Así se ve",
    "galeria.titulo": "Galeria",
    "galeria.parrafo": "Desliza para ver más, clic en cualquier foto para ir a Instagram.",
    "lightbox.instagram": "Ver en Instagram",
    "puertas.eyebrow": "Se busca",
    "puertas.titulo": "Se parte de Coyote",
    "puertas.parrafo": "Trabajo, talento y aliados — todas las formas de sumarte a la casa.",
    "campo.nombre": "Nombre completo",
    "campo.telefono": "Teléfono",
    "campo.correo": "Correo",
    "campo.opcional": "(opcional)",
    "campo.tipoDocumento": "Tipo de documento",
    "campo.numeroDocumento": "Número de documento",
    "campo.selecciona": "Selecciona una opción",
    "doc.cedula": "Cédula de ciudadanía",
    "doc.cedulaExtranjeria": "Cédula de extranjería",
    "doc.pasaporte": "Pasaporte",
    "empleo.titulo": "Trabaja con nosotros",
    "empleo.desc": "Meseros, cocina, seguridad — súmate al equipo que hace que la casa funcione.",
    "empleo.cta": "Postúlate",
    "empleo.cargoLabel": "Cargo al que aplicas",
    "empleo.disponibilidadLabel": "Disponibilidad de tiempo",
    "empleo.experienciaLabel": "Cuéntanos tu experiencia",
    "empleo.enviar": "Enviar postulación",
    "empleo.graciasTitulo": "¡Listo!",
    "empleo.graciasMensaje": "Recibimos tu postulación. Si encajas con una vacante te contactamos por teléfono.",
    "cargo.mesero": "Mesero/a",
    "cargo.cocina": "Cocina",
    "cargo.seguridad": "Seguridad",
    "cargo.cajero": "Cajero/a",
    "cargo.admin": "Cargo administrativo",
    "disponibilidad.completo": "Tiempo completo",
    "disponibilidad.medio": "Medio tiempo",
    "disponibilidad.finde": "Fines de semana",
    "legal.acepto": "Acepto los",
    "legal.terminos": "Términos y condiciones",
    "legal.autorizo": "y autorizo el tratamiento de mis datos personales según la",
    "legal.privacidad": "Política de tratamiento de datos",
    "legal.cerrar": "Cerrar",
    "reserva.titulo": "Reserva tu mesa",
    "reserva.desc": "Dinos cuándo llegas y cuántos son, y te la dejamos lista.",
    "reserva.cta": "Reserva ahora",
    "reserva.fecha": "Fecha",
    "reserva.hora": "Hora",
    "reserva.personas": "Número de personas",
    "reserva.enviar": "Enviar por WhatsApp",
    "reserva.graciasTitulo": "¡Listo!",
    "reserva.graciasMensaje": "Se abrió WhatsApp con tu mensaje escrito — solo dale enviar.",
    "proveedor.titulo": "Sé nuestro proveedor",
    "proveedor.desc": "Licores, insumos, menaje — preséntanos lo que ofreces y tus condiciones.",
    "proveedor.cta": "Preséntate",
    "proveedor.empresa": "Nombre de la empresa",
    "proveedor.contacto": "Persona de contacto",
    "proveedor.queLabel": "Qué suministras",
    "proveedor.queLabel2": "¿Qué suministras?",
    "proveedor.especifica": "Especifica cuál",
    "proveedor.enviar": "Enviar presentación",
    "proveedor.graciasTitulo": "¡Gracias!",
    "proveedor.graciasMensaje": "El área de compras revisa tu propuesta y te contacta si hay un buen encaje.",
    "suministra.licores": "Licores y bebidas",
    "suministra.insumos": "Insumos",
    "suministra.menaje": "Menaje",
    "suministra.otro": "Otro",
    "ubicacion.eyebrow": "¿Dónde queda Coyote?",
    "ubicacion.direccion2": "Ed. Foresta Local 1 · Armenia, Quindío",
    "ubicacion.boton": "Cómo llegar",
    "comunidad.titulo": "Unete a nuestra comunidad",
    "comunidad.parrafo": "Regístrate y empieza a acumular puntos con cada visita.",
    "comunidad.boton": "Únete aquí",
    "footer.direccion": "Av. 19 No. 33N-11, Ed. Foresta Local 1 · Armenia, Quindío",
  },
  en: {
    "nav.coyote": "Coyote",
    "nav.vermas": "See more",
    "nav.ubicacion": "Location",
    "nav.unete": "Join",
    "hero.eyebrow": "Armenia, Quindío",
    "hero.titulo": "Tacos, burritos, tequila and music with no dress code",
    "hero.parrafo": "The spot in Armenia where the tacos come out hot, the house fills up fast, and the night stretches on until someone turns off the music.",
    "hero.boton1": "Join Coyote",
    "hero.boton2": "See more",
    "sobre.eyebrow": "About Coyote",
    "sobre.titulo": "Taqueria Mex Mex",
    "sobre.parrafo": "Coyote is a taco, burrito and michelada social house in Armenia — the kind of place you come to for the food and stay for the music. Folding chairs, lots of red, and a bar that never stops. We're the team behind the bar, the kitchen and the music: the people who make every night at Coyote feel like being at a friend's house.",
    "sobre.dato2": "Tacos, burritos & micheladas",
    "galeria.eyebrow": "See for yourself",
    "galeria.titulo": "Gallery",
    "galeria.parrafo": "Swipe to see more, click any photo to go to Instagram.",
    "lightbox.instagram": "View on Instagram",
    "puertas.eyebrow": "We're hiring",
    "puertas.titulo": "Be part of Coyote",
    "puertas.parrafo": "Work, talent and partners — every way to join the house.",
    "campo.nombre": "Full name",
    "campo.telefono": "Phone number",
    "campo.correo": "Email",
    "campo.opcional": "(optional)",
    "campo.tipoDocumento": "ID type",
    "campo.numeroDocumento": "ID number",
    "campo.selecciona": "Select an option",
    "doc.cedula": "National ID",
    "doc.cedulaExtranjeria": "Foreign resident ID",
    "doc.pasaporte": "Passport",
    "empleo.titulo": "Work with us",
    "empleo.desc": "Servers, kitchen, security — join the team that makes the house run.",
    "empleo.cta": "Apply now",
    "empleo.cargoLabel": "Position you're applying for",
    "empleo.disponibilidadLabel": "Time availability",
    "empleo.experienciaLabel": "Tell us about your experience",
    "empleo.enviar": "Send application",
    "empleo.graciasTitulo": "All set!",
    "empleo.graciasMensaje": "We received your application. If you fit an opening we'll contact you by phone.",
    "cargo.mesero": "Server",
    "cargo.cocina": "Kitchen",
    "cargo.seguridad": "Security",
    "cargo.cajero": "Cashier",
    "cargo.admin": "Administrative role",
    "disponibilidad.completo": "Full time",
    "disponibilidad.medio": "Part time",
    "disponibilidad.finde": "Weekends",
    "legal.acepto": "I accept the",
    "legal.terminos": "Terms and Conditions",
    "legal.autorizo": "and authorize the processing of my personal data under the",
    "legal.privacidad": "Data Processing Policy",
    "legal.cerrar": "Close",
    "reserva.titulo": "Reserve your table",
    "reserva.desc": "Tell us when you're coming and how many, and we'll have it ready.",
    "reserva.cta": "Reserve now",
    "reserva.fecha": "Date",
    "reserva.hora": "Time",
    "reserva.personas": "Number of people",
    "reserva.enviar": "Send via WhatsApp",
    "reserva.graciasTitulo": "All set!",
    "reserva.graciasMensaje": "WhatsApp opened with your message already written — just hit send.",
    "proveedor.titulo": "Become our supplier",
    "proveedor.desc": "Liquor, supplies, tableware — show us what you offer and your terms.",
    "proveedor.cta": "Introduce yourself",
    "proveedor.empresa": "Company name",
    "proveedor.contacto": "Contact person",
    "proveedor.queLabel": "What do you supply",
    "proveedor.queLabel2": "What do you supply?",
    "proveedor.especifica": "Specify which",
    "proveedor.enviar": "Send submission",
    "proveedor.graciasTitulo": "Thank you!",
    "proveedor.graciasMensaje": "Our purchasing team will review your proposal and reach out if it's a good fit.",
    "suministra.licores": "Liquor and beverages",
    "suministra.insumos": "Supplies",
    "suministra.menaje": "Tableware",
    "suministra.otro": "Other",
    "ubicacion.eyebrow": "Where is Coyote?",
    "ubicacion.direccion2": "Ed. Foresta Local 1 · Armenia, Quindío",
    "ubicacion.boton": "Get directions",
    "comunidad.titulo": "Join our community",
    "comunidad.parrafo": "Sign up and start earning points on every visit.",
    "comunidad.boton": "Join here",
    "footer.direccion": "Av. 19 No. 33N-11, Ed. Foresta Local 1 · Armenia, Quindío",
  },
};

const CONTENIDO_TERMINOS = {
  es: `
    <p class="politica-fecha">Última actualización: 6 de agosto de 2026</p>

    <h3>1. Objeto</h3>
    <p>
      Estos Términos y Condiciones regulan el envío de postulaciones de empleo, presentaciones de proveedores y
      solicitudes de reserva a través de este sitio web de Coyote Salón Social. Al enviar cualquiera de estos
      formularios, usted acepta expresamente estos términos.
    </p>

    <h3>2. Veracidad de la información</h3>
    <p>
      Al enviar un formulario, usted declara que la información suministrada (nombre, documento, contacto y demás
      datos solicitados) es veraz, completa y de su titularidad.
    </p>

    <h3>3. Uso de la información suministrada</h3>
    <p>
      Los datos que usted nos entrega se usan únicamente para evaluar y responder su postulación, presentación como
      proveedor o solicitud de reserva. El detalle completo de cómo tratamos sus datos está en nuestra
      <button type="button" class="link-modal" data-modal="privacidad">Política de tratamiento de datos</button>.
    </p>

    <h3>4. Sin garantía de vinculación</h3>
    <p>
      El envío de una postulación de empleo o presentación como proveedor no garantiza contratación ni vinculación
      comercial alguna. Coyote Salón Social evaluará cada solicitud según sus necesidades del momento.
    </p>

    <h3>5. Modificaciones</h3>
    <p>
      Podemos actualizar estos Términos y Condiciones periódicamente. Cualquier cambio será publicado en esta misma
      página con su fecha de actualización.
    </p>

    <h3>6. Contacto</h3>
    <p>
      Para dudas sobre estos Términos y Condiciones, escríbanos a <strong>privacidad@coyotesalonsocial.com</strong>.
    </p>

    <p class="nota-legal">Este sitio y sus formularios fueron desarrollados con asistencia de inteligencia artificial.</p>
  `,
  en: `
    <p class="politica-fecha">Last updated: August 6, 2026</p>

    <h3>1. Purpose</h3>
    <p>
      These Terms and Conditions govern the submission of job applications, supplier presentations, and reservation
      requests through this Coyote Salón Social website. By submitting any of these forms, you expressly accept
      these terms.
    </p>

    <h3>2. Accuracy of information</h3>
    <p>
      By submitting a form, you declare that the information provided (name, ID, contact details, and other
      requested data) is true, complete, and belongs to you.
    </p>

    <h3>3. Use of the information provided</h3>
    <p>
      The data you provide is used solely to evaluate and respond to your application, supplier presentation, or
      reservation request. Full details on how we handle your data are in our
      <button type="button" class="link-modal" data-modal="privacidad">Data Processing Policy</button>.
    </p>

    <h3>4. No guarantee of engagement</h3>
    <p>
      Submitting a job application or supplier presentation does not guarantee hiring or any business relationship.
      Coyote Salón Social will evaluate each request according to its needs at the time.
    </p>

    <h3>5. Changes</h3>
    <p>
      We may update these Terms and Conditions periodically. Any change will be published on this same page with
      its update date.
    </p>

    <h3>6. Contact</h3>
    <p>
      For questions about these Terms and Conditions, write to us at <strong>privacidad@coyotesalonsocial.com</strong>.
    </p>

    <p class="nota-legal">This site and its forms were developed with the assistance of artificial intelligence.</p>
  `,
};

const CONTENIDO_PRIVACIDAD = {
  es: `
    <p class="politica-fecha">Última actualización: 6 de agosto de 2026</p>

    <h3>1. Responsable del tratamiento</h3>
    <p>
      Coyote Salón Social es responsable del tratamiento de los datos personales que usted nos suministra a través
      de los formularios de este sitio, de acuerdo con la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de
      la República de Colombia sobre Protección de Datos Personales.
    </p>

    <h3>2. Datos que recolectamos</h3>
    <p>
      Según el formulario que use, recolectamos: nombre completo, teléfono, tipo y número de documento, y —según el
      caso— cargo al que aplica, disponibilidad de tiempo y experiencia (postulaciones de empleo); nombre de la
      empresa, persona de contacto y qué suministra (proveedores); o fecha, hora y número de personas (reservas).
    </p>

    <h3>3. Finalidad del tratamiento</h3>
    <p>
      Sus datos se usan exclusivamente para evaluar y dar respuesta a su postulación, presentación como proveedor o
      solicitud de reserva. No los usamos para ningún otro fin, ni los vendemos ni los compartimos con terceros
      ajenos a la operación del restaurante.
    </p>

    <h3>4. Derechos del titular</h3>
    <p>
      Usted tiene derecho a conocer qué datos suyos tenemos, actualizarlos y rectificarlos, y solicitar su
      supresión en cualquier momento.
    </p>

    <h3>5. Cómo ejercer sus derechos</h3>
    <p>
      Escríbanos a <strong>privacidad@coyotesalonsocial.com</strong>. Responderemos su solicitud dentro de los
      plazos legales (10 días hábiles para consultas, 15 días hábiles para reclamos).
    </p>

    <h3>6. Conservación de los datos</h3>
    <p>
      Conservamos sus datos mientras sea necesario para evaluar su solicitud, o hasta que usted pida su supresión.
    </p>

    <h3>7. Seguridad de la información</h3>
    <p>
      Sus datos se almacenan en una base de datos con acceso restringido y controles técnicos razonables para
      evitar accesos no autorizados.
    </p>

    <h3>8. Cambios en esta política</h3>
    <p>
      Podemos actualizar esta política periódicamente. Cualquier cambio será publicado en esta misma página con su
      fecha de actualización.
    </p>
  `,
  en: `
    <p class="politica-fecha">Last updated: August 6, 2026</p>

    <h3>1. Data controller</h3>
    <p>
      Coyote Salón Social is responsible for processing the personal data you provide through the forms on this
      site, in accordance with Statutory Law 1581 of 2012 and Decree 1377 of 2013 of the Republic of Colombia on
      Personal Data Protection.
    </p>

    <h3>2. Data we collect</h3>
    <p>
      Depending on the form you use, we collect: full name, phone number, ID type and number, and — as
      applicable — the position you're applying for, time availability and experience (job applications); company
      name, contact person and what you supply (suppliers); or date, time and number of guests (reservations).
    </p>

    <h3>3. Purpose of processing</h3>
    <p>
      Your data is used exclusively to evaluate and respond to your application, supplier presentation, or
      reservation request. We do not use it for any other purpose, nor do we sell it or share it with third
      parties unrelated to the restaurant's operation.
    </p>

    <h3>4. Data subject rights</h3>
    <p>
      You have the right to know what data of yours we hold, update and correct it, and request its deletion at
      any time.
    </p>

    <h3>5. How to exercise your rights</h3>
    <p>
      Write to us at <strong>privacidad@coyotesalonsocial.com</strong>. We will respond to your request within the
      legal timeframes (10 business days for inquiries, 15 business days for complaints).
    </p>

    <h3>6. Data retention</h3>
    <p>
      We retain your data for as long as necessary to evaluate your request, or until you request its deletion.
    </p>

    <h3>7. Information security</h3>
    <p>
      Your data is stored in a database with restricted access and reasonable technical controls to prevent
      unauthorized access.
    </p>

    <h3>8. Changes to this policy</h3>
    <p>
      We may update this policy periodically. Any change will be published on this same page with its update date.
    </p>
  `,
};

let idiomaActual = localStorage.getItem("coyote-idioma") || "es";

function t(clave) {
  return TRANSLATIONS[idiomaActual][clave];
}

function renderizarContenidoLegal() {
  const contenidoTerminos = document.getElementById("contenido-terminos");
  const contenidoPrivacidad = document.getElementById("contenido-privacidad");
  if (contenidoTerminos) contenidoTerminos.innerHTML = CONTENIDO_TERMINOS[idiomaActual];
  if (contenidoPrivacidad) contenidoPrivacidad.innerHTML = CONTENIDO_PRIVACIDAD[idiomaActual];
}

function aplicarIdioma(lang) {
  idiomaActual = lang;
  localStorage.setItem("coyote-idioma", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const clave = el.getAttribute("data-i18n");
    const valor = t(clave);
    if (valor != null) {
      const nodoTexto = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (nodoTexto) {
        nodoTexto.textContent = valor + " ";
      } else {
        el.textContent = valor;
      }
    }
  });

  // La fuente decorativa de los titulos no trae los glifos con tilde (el navegador usaba
  // otra fuente solo para esa letra y se notaba). En espanol se separa la letra con tilde
  // en un span propio para poder dibujarsela con CSS (ver .tilde-manual); en ingles esos
  // titulos no la necesitan.
  const titulosConTildeManual = [
    { clave: "comunidad.titulo", es: '<span class="tilde-manual">U</span>nete a nuestra comunidad' },
    { clave: "sobre.titulo", es: 'Taquer<span class="tilde-manual">i</span>a Mex Mex' },
    { clave: "galeria.titulo", es: 'Galer<span class="tilde-manual">i</span>a' },
  ];
  titulosConTildeManual.forEach(({ clave, es }) => {
    const el = document.querySelector(`[data-i18n="${clave}"]`);
    if (!el) return;
    if (lang === "es") {
      el.innerHTML = es;
    } else {
      el.textContent = t(clave);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const clave = el.getAttribute("data-i18n-placeholder");
    const valor = t(clave);
    if (valor != null) el.placeholder = valor;
  });

  document.querySelectorAll(".lang-btn").forEach((boton) => {
    boton.setAttribute("aria-pressed", String(boton.dataset.lang === lang));
  });

  renderizarContenidoLegal();
}

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

setupIdioma();

const modalesLegales = {
  terminos: document.getElementById("modal-terminos"),
  privacidad: document.getElementById("modal-privacidad"),
};

document.addEventListener("click", (evento) => {
  const abrir = evento.target.closest("[data-modal]");
  if (abrir) {
    const modal = modalesLegales[abrir.dataset.modal];
    if (modal) {
      Object.values(modalesLegales).forEach((m) => m.open && m.close());
      document.body.classList.add("modal-abierto");
      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "");
      }
    }
    return;
  }

  const cerrar = evento.target.closest("[data-cerrar-modal]");
  if (cerrar) {
    const dialogo = cerrar.closest("dialog");
    if (dialogo) {
      if (typeof dialogo.close === "function") {
        dialogo.close();
      } else {
        dialogo.removeAttribute("open");
        document.body.classList.remove("modal-abierto");
      }
    }
  }
});

Object.values(modalesLegales).forEach((dialogo) => {
  dialogo.addEventListener("close", () => document.body.classList.remove("modal-abierto"));
});

const telefonosConPais = {};
["e-telefono", "r-telefono", "p-telefono"].forEach((id) => {
  const input = document.getElementById(id);
  if (!input || !window.intlTelInput) return;
  telefonosConPais[id] = window.intlTelInput(input, {
    initialCountry: "co",
    separateDialCode: true,
    preferredCountries: ["co", "mx", "ar", "cl", "pe", "es", "us"],
  });
});

function obtenerTelefono(id) {
  const iti = telefonosConPais[id];
  const valorCrudo = document.getElementById(id).value.trim();
  if (!iti) return valorCrudo;
  return valorCrudo ? iti.getNumber() || valorCrudo : "";
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
let arrastroSignificativoEnCarrusel = false;
if (carrusel && carrusel.children.length > 1) {
  // El transform tiene que ir en una pista interna, separada del marco que recorta
  // (overflow: hidden). Si se moviera el mismo elemento que recorta, se desplazaria el
  // marco entero junto con las fotos y visualmente no cambiaria nada.
  const pista = document.createElement("div");
  pista.className = "carrusel-pista";
  while (carrusel.firstElementChild) {
    pista.appendChild(carrusel.firstElementChild);
  }
  carrusel.appendChild(pista);

  const anchoItem = () => pista.firstElementChild.getBoundingClientRect().width + 16;

  // Se mantiene siempre exactamente una foto "de respaldo" pegada al frente (la ultima de
  // la fila, movida ahi al inicio) para poder revelar el "anterior" sin dejar un hueco en
  // blanco. Con eso, tanto avanzar como retroceder terminan en el mismo estado en reposo
  // (desplazamiento == anchoItem()), asi que nunca hace falta "regresar" nada: siempre se
  // sigue de largo hacia el mismo lado.
  pista.insertBefore(pista.lastElementChild, pista.firstElementChild);

  let desplazamiento = anchoItem();
  let animando = false;

  const posicionar = (animado) => {
    pista.style.transition = animado ? "transform 380ms cubic-bezier(0.22, 0.9, 0.32, 1.1)" : "none";
    pista.style.transform = `translateX(${-desplazamiento}px)`;
  };
  posicionar(false);

  const reciclarFrente = () => {
    pista.appendChild(pista.firstElementChild);
    desplazamiento -= anchoItem();
    posicionar(false);
  };
  const reciclarFondo = () => {
    pista.insertBefore(pista.lastElementChild, pista.firstElementChild);
    desplazamiento += anchoItem();
    posicionar(false);
  };

  pista.addEventListener("transitionend", (evento) => {
    if (evento.propertyName !== "transform") return;
    const w = anchoItem();
    if (desplazamiento > w * 1.5) reciclarFrente();
    else if (desplazamiento < w * 0.5) reciclarFondo();
    animando = false;
  });

  document.querySelector(".carrusel-siguiente")?.addEventListener("click", () => {
    if (animando) return;
    animando = true;
    desplazamiento += anchoItem();
    posicionar(true);
  });
  document.querySelector(".carrusel-anterior")?.addEventListener("click", () => {
    if (animando) return;
    animando = true;
    desplazamiento -= anchoItem();
    posicionar(true);
  });

  let arrastrando = false;
  let xAnterior = 0;
  let arrastreTotal = 0;

  carrusel.addEventListener("pointerdown", (evento) => {
    if (animando) return;
    arrastrando = true;
    arrastreTotal = 0;
    xAnterior = evento.clientX;
    carrusel.setPointerCapture(evento.pointerId);
  });

  carrusel.addEventListener("pointermove", (evento) => {
    if (!arrastrando) return;
    const delta = evento.clientX - xAnterior;
    xAnterior = evento.clientX;
    arrastreTotal += Math.abs(delta);
    desplazamiento -= delta;

    const w = anchoItem();
    while (desplazamiento >= 2 * w) reciclarFrente();
    while (desplazamiento <= 0) reciclarFondo();

    posicionar(false);
  });

  const soltar = () => {
    if (!arrastrando) return;
    arrastrando = false;
    arrastroSignificativoEnCarrusel = arrastreTotal > 6;

    const w = anchoItem();
    let objetivo = w;
    if (desplazamiento > w * 1.2) objetivo = 2 * w;
    else if (desplazamiento < w * 0.8) objetivo = 0;

    if (objetivo === desplazamiento) {
      posicionar(false);
      return;
    }
    desplazamiento = objetivo;
    animando = true;
    posicionar(true);
  };

  carrusel.addEventListener("pointerup", soltar);
  carrusel.addEventListener("pointercancel", soltar);
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

  document.querySelectorAll(".carrusel-item").forEach((foto) => {
    foto.addEventListener("click", () => {
      if (arrastroSignificativoEnCarrusel) {
        arrastroSignificativoEnCarrusel = false;
        return;
      }
      abrirLightbox(foto);
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
      disponibilidad: "e-disponibilidad",
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

function irAUbicacion() {
  document.getElementById("ubicacion")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".puerta-form").forEach((form) => {
  if (form.id === "panel-reserva") {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const nombre = document.getElementById("r-nombre").value.trim();
      const telefono = obtenerTelefono("r-telefono");
      const documentoTipo = ETIQUETAS_DOCUMENTO_WA[document.getElementById("r-documento-tipo").value] || "";
      const documentoNumero = document.getElementById("r-documento-numero").value.trim();
      const fecha = document.getElementById("r-fecha").value;
      const hora = document.getElementById("r-hora").value;
      const personas = document.getElementById("r-personas").value.trim();
      const mensaje = `Hola, soy ${nombre}, ${documentoTipo} ${documentoNumero}, mi teléfono es ${telefono}. Quiero reservar mesa para ${personas} personas el ${fecha} a las ${hora}.`;
      window.open(`https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
      form.closest(".puerta").classList.add("enviada");
      irAUbicacion();
    });
    return;
  }

  const config = CAMPOS_POR_TIPO[form.id];

  if (!config) {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      form.closest(".puerta").classList.add("enviada");
      irAUbicacion();
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
      payload[campo] = campo === "telefono" ? obtenerTelefono(id) : document.getElementById(id).value.trim();
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
      irAUbicacion();
    } catch {
      if (errorEl) errorEl.textContent = "No pudimos enviar el formulario. Revisa tu conexión e intenta de nuevo.";
    } finally {
      botonEnviar.disabled = false;
    }
  });
});
