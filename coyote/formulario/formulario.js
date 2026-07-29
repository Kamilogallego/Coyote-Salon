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
    "common.cerrar": "Cerrar",
    "modalTerminos.titulo": "Términos y Condiciones",
    "modalPrivacidad.titulo": "Política de Privacidad",
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
    "medioContacto.ninguno": "Me es indiferente",
    "checkbox.mayorEdad": "Declaro que soy mayor de edad (18 años o más).",
    "checkbox.habeasIntro0": "Acepto los ",
    "checkbox.terminosLink": "Términos y Condiciones",
    "checkbox.habeasIntro": " y autorizo el tratamiento de mis datos personales conforme a la",
    "checkbox.habeasMid": " y el ",
    "checkbox.habeasEnd": "sobre Protección de Datos Personales (Habeas Data), según la ",
    "checkbox.habeasPoliticaLink": "Política de Tratamiento de Datos de Coyote Salón Social",
    "checkbox.novedades":
      "Sí, quiero enterarme de promociones, eventos y un beneficio especial en fechas especiales, por tu preferencia de contacto. Es opcional y puedo darme de baja cuando quiera (",
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
    "common.cerrar": "Close",
    "modalTerminos.titulo": "Terms and Conditions",
    "modalPrivacidad.titulo": "Privacy Policy",
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
    "medioContacto.ninguno": "I don't mind either way",
    "checkbox.mayorEdad": "I declare that I am of legal age (18 years or older).",
    "checkbox.habeasIntro0": "I accept the ",
    "checkbox.terminosLink": "Terms and Conditions",
    "checkbox.habeasIntro": " and I authorize the processing of my personal data in accordance with",
    "checkbox.habeasMid": " and ",
    "checkbox.habeasEnd": "on Personal Data Protection (Habeas Data), per the ",
    "checkbox.habeasPoliticaLink": "Coyote Salón Social Data Processing Policy",
    "checkbox.novedades":
      "Yes, I'd like to hear about promotions, events, and a special treat on special dates, through my preferred contact method. It's optional and I can unsubscribe anytime (",
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

const CONTENIDO_TERMINOS = {
  es: `
    <p class="politica-fecha">Última actualización: 28 de julio de 2026</p>

    <h3>1. Objeto</h3>
    <p>
      Estos Términos y Condiciones regulan el registro y la participación en el programa de fidelización de Coyote
      Salón Social, restaurante de comida mexicana de ambiente familiar. Al diligenciar el formulario de registro,
      usted acepta expresamente estos términos.
    </p>

    <h3>2. Elegibilidad y veracidad de la información</h3>
    <p>
      El registro está dirigido únicamente a personas mayores de 18 años. Al registrarse, usted declara que la
      información suministrada (nombre, documento, contacto y demás datos solicitados) es veraz, completa y de su
      titularidad, y que es responsable de mantenerla actualizada.
    </p>

    <h3>3. Uso de la información suministrada</h3>
    <p>
      Los datos que usted nos entrega se usan para identificarlo como miembro del programa de fidelización,
      contactarlo por el canal de su preferencia, y — únicamente si lo autoriza de forma expresa y separada — para
      enviarle publicidad y promociones. El detalle completo de cómo tratamos sus datos está en nuestra
      <button type="button" class="link-modal" data-modal="privacidad">Política de Tratamiento de Datos Personales</button>.
    </p>

    <h3>4. Beneficios, puntos y promociones</h3>
    <p>
      Los puntos y beneficios del programa de fidelización son personales e intransferibles, y no son canjeables por
      dinero en efectivo. Coyote Salón Social podrá modificar, suspender o finalizar el programa, sus beneficios o
      cualquier promoción asociada en cualquier momento, informando oportunamente a través de sus canales oficiales.
    </p>

    <h3>5. Responsabilidad del titular de los datos</h3>
    <p>
      Es responsabilidad suya mantener actualizada la información de contacto que nos suministra (teléfono, correo
      electrónico, etc.). Coyote Salón Social no se hace responsable por la imposibilidad de contactarlo o de
      hacerle efectivo un beneficio debido a datos desactualizados o incorrectos.
    </p>

    <h3>6. Comunicaciones de mercadeo</h3>
    <p>
      El registro en el programa de fidelización no implica, por sí solo, la autorización para recibir publicidad o
      promociones. Esa autorización es independiente, opcional y revocable en cualquier momento sin que afecte su
      registro, tal como se describe en nuestra
      <button type="button" class="link-modal" data-modal="privacidad">Política de Tratamiento de Datos Personales</button>.
    </p>

    <h3>7. Modificaciones a estos términos</h3>
    <p>
      Podemos actualizar estos Términos y Condiciones periódicamente. Cualquier cambio será publicado en esta misma
      página con su fecha de actualización.
    </p>

    <h3>8. Contacto</h3>
    <p>
      Para dudas sobre estos Términos y Condiciones, escríbanos a <strong>privacidad@coyotesalonsocial.com</strong>.
    </p>
  `,
  en: `
    <p class="politica-fecha">Last updated: July 28, 2026</p>

    <h3>1. Purpose</h3>
    <p>
      These Terms and Conditions govern registration and participation in the Coyote Salón Social loyalty program, a
      family-style Mexican restaurant. By completing the registration form, you expressly accept these terms.
    </p>

    <h3>2. Eligibility and accuracy of information</h3>
    <p>
      Registration is intended only for persons over 18 years of age. By registering, you declare that the
      information provided (name, ID, contact details, and other requested data) is true, complete, and belongs to
      you, and that you are responsible for keeping it up to date.
    </p>

    <h3>3. Use of the information provided</h3>
    <p>
      The data you provide is used to identify you as a loyalty program member, contact you through your preferred
      channel, and — only if you expressly and separately authorize it — to send you advertising and promotions.
      Full details on how we handle your data are in our
      <button type="button" class="link-modal" data-modal="privacidad">Personal Data Processing Policy</button>.
    </p>

    <h3>4. Benefits, points, and promotions</h3>
    <p>
      Loyalty program points and benefits are personal and non-transferable, and cannot be redeemed for cash. Coyote
      Salón Social may modify, suspend, or end the program, its benefits, or any associated promotion at any time,
      providing timely notice through its official channels.
    </p>

    <h3>5. Data subject's responsibility</h3>
    <p>
      It is your responsibility to keep the contact information you provide us up to date (phone, email, etc.).
      Coyote Salón Social is not responsible for being unable to contact you or grant you a benefit due to outdated
      or incorrect information.
    </p>

    <h3>6. Marketing communications</h3>
    <p>
      Registering in the loyalty program does not, by itself, authorize you to receive advertising or promotions.
      That authorization is independent, optional, and revocable at any time without affecting your registration, as
      described in our
      <button type="button" class="link-modal" data-modal="privacidad">Personal Data Processing Policy</button>.
    </p>

    <h3>7. Changes to these terms</h3>
    <p>
      We may update these Terms and Conditions periodically. Any change will be published on this same page with its
      update date.
    </p>

    <h3>8. Contact</h3>
    <p>
      For questions about these Terms and Conditions, write to us at <strong>privacidad@coyotesalonsocial.com</strong>.
    </p>
  `,
};

const CONTENIDO_PRIVACIDAD = {
  es: `
    <p class="politica-fecha">Última actualización: 28 de julio de 2026</p>
    <p>
      Este documento se complementa con nuestros
      <button type="button" class="link-modal" data-modal="terminos">Términos y Condiciones</button> del programa de
      fidelización.
    </p>

    <h3>1. Responsable del tratamiento</h3>
    <p>
      Coyote Salón Social es responsable del tratamiento de los datos personales que usted nos suministra a través
      de nuestro formulario de registro y fidelización, de acuerdo con la Ley Estatutaria 1581 de 2012 y el Decreto
      1377 de 2013 de la República de Colombia sobre Protección de Datos Personales.
    </p>

    <h3>2. Datos que recolectamos</h3>
    <p>
      A través de nuestro formulario de registro recolectamos: datos de identificación (nombre completo, tipo y
      número de documento, fecha de nacimiento, género), datos de contacto (teléfono/WhatsApp, correo electrónico,
      país y ciudad de residencia, preferencia de canal de contacto), datos de estilo de vida opcionales (si es
      padre/madre, si tiene pareja y fecha de aniversario), y los consentimientos otorgados (autorización de
      tratamiento de datos y, de forma independiente, autorización de mercadeo).
    </p>

    <h3>3. Finalidad del tratamiento</h3>
    <p>
      Sus datos se usan para gestionar su registro en el programa de fidelización, contactarlo por el canal de su
      preferencia, y elaborar estadísticas internas anónimas sobre visitas y preferencias. No usamos sus datos para
      ningún otro fin, ni los vendemos ni los compartimos con terceros ajenos a la operación del restaurante.
    </p>

    <h3>4. Autorización de mercadeo (independiente y opcional)</h3>
    <p>
      Además de lo anterior, en el formulario le preguntamos si desea autorizar, de forma expresa, independiente y
      opcional, el envío de publicidad, promociones y novedades de Coyote Salón Social por correo electrónico y/o
      WhatsApp. Esta autorización <strong>no es obligatoria</strong> para registrarse en el programa de
      fidelización, y usted puede revocarla en cualquier momento sin que esto afecte su registro, escribiéndonos a
      <strong>privacidad@coyotesalonsocial.com</strong> indicando su nombre y número de documento. Atenderemos su
      solicitud de revocación dentro de los 15 días hábiles siguientes.
    </p>

    <h3>5. Derechos del titular</h3>
    <p>
      Usted tiene derecho a conocer qué datos suyos tenemos, actualizarlos y rectificarlos, solicitar su supresión,
      y revocar su autorización en cualquier momento (incluyendo la de mercadeo, sin afectar su registro de
      fidelización).
    </p>

    <h3>6. Cómo ejercer sus derechos</h3>
    <p>
      Escríbanos a <strong>privacidad@coyotesalonsocial.com</strong>. Responderemos su solicitud dentro de los
      plazos legales (10 días hábiles para consultas, 15 días hábiles para reclamos), indicando como mínimo su
      identificación, la descripción de su solicitud y un correo de contacto para responderle.
    </p>

    <h3>7. Conservación de los datos</h3>
    <p>
      Conservamos sus datos mientras exista una relación vigente con nuestro programa de fidelización, o hasta que
      usted solicite su supresión.
    </p>

    <h3>8. Seguridad de la información</h3>
    <p>
      Sus datos se almacenan en una base de datos con acceso restringido y controles técnicos razonables para
      evitar accesos no autorizados.
    </p>

    <h3>9. Menores de edad</h3>
    <p>Nuestro formulario está dirigido únicamente a personas mayores de 18 años.</p>

    <h3>10. Cambios en esta política</h3>
    <p>
      Podemos actualizar esta política periódicamente. Cualquier cambio será publicado en esta misma página con su
      fecha de actualización.
    </p>
  `,
  en: `
    <p class="politica-fecha">Last updated: July 28, 2026</p>
    <p>
      This document complements our
      <button type="button" class="link-modal" data-modal="terminos">Terms and Conditions</button> for the loyalty
      program.
    </p>

    <h3>1. Data controller</h3>
    <p>
      Coyote Salón Social is responsible for processing the personal data you provide through our registration and
      loyalty form, in accordance with Statutory Law 1581 of 2012 and Decree 1377 of 2013 of the Republic of
      Colombia on Personal Data Protection.
    </p>

    <h3>2. Data we collect</h3>
    <p>
      Through our registration form we collect: identification data (full name, ID type and number, date of birth,
      gender), contact data (phone/WhatsApp, email, country and city of residence, preferred contact channel),
      optional lifestyle data (whether you are a parent, whether you have a partner, and anniversary date), and the
      consents given (data processing authorization and, independently, marketing authorization).
    </p>

    <h3>3. Purpose of processing</h3>
    <p>
      Your data is used to manage your loyalty program registration, contact you through your preferred channel,
      and produce anonymous internal statistics about visits and preferences. We do not use your data for any other
      purpose, nor do we sell it or share it with third parties unrelated to the restaurant's operation.
    </p>

    <h3>4. Marketing authorization (independent and optional)</h3>
    <p>
      In addition to the above, on the form we ask whether you wish to expressly, independently, and optionally
      authorize Coyote Salón Social to send you advertising, promotions, and news by email and/or WhatsApp. This
      authorization <strong>is not required</strong> to register in the loyalty program, and you may revoke it at
      any time without affecting your registration, by writing to <strong>privacidad@coyotesalonsocial.com</strong>
      with your name and ID number. We will handle your revocation request within the following 15 business days.
    </p>

    <h3>5. Data subject rights</h3>
    <p>
      You have the right to know what data of yours we hold, update and correct it, request its deletion, and
      revoke your authorization at any time (including marketing authorization, without affecting your loyalty
      registration).
    </p>

    <h3>6. How to exercise your rights</h3>
    <p>
      Write to us at <strong>privacidad@coyotesalonsocial.com</strong>. We will respond to your request within the
      legal timeframes (10 business days for inquiries, 15 business days for complaints), providing at minimum your
      identification, a description of your request, and a contact email for our reply.
    </p>

    <h3>7. Data retention</h3>
    <p>
      We retain your data for as long as an active relationship with our loyalty program exists, or until you
      request its deletion.
    </p>

    <h3>8. Information security</h3>
    <p>
      Your data is stored in a database with restricted access and reasonable technical controls to prevent
      unauthorized access.
    </p>

    <h3>9. Minors</h3>
    <p>Our form is intended only for persons over 18 years of age.</p>

    <h3>10. Changes to this policy</h3>
    <p>
      We may update this policy periodically. Any change will be published on this same page with its update date.
    </p>
  `,
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
  setupModalesLegales();
  setupIdioma();

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
  renderizarContenidoLegal();
}

function renderizarContenidoLegal() {
  const contenidoTerminos = document.getElementById("contenido-terminos");
  const contenidoPrivacidad = document.getElementById("contenido-privacidad");
  if (contenidoTerminos) contenidoTerminos.innerHTML = CONTENIDO_TERMINOS[idiomaActual];
  if (contenidoPrivacidad) contenidoPrivacidad.innerHTML = CONTENIDO_PRIVACIDAD[idiomaActual];
}

function setupModalesLegales() {
  const modales = {
    terminos: document.getElementById("modal-terminos"),
    privacidad: document.getElementById("modal-privacidad"),
  };

  renderizarContenidoLegal();

  Object.values(modales).forEach((dialogo) => {
    // Se dispara también al cerrar con la tecla Esc, no solo con el botón "Cerrar".
    dialogo.addEventListener("close", () => document.body.classList.remove("modal-abierto"));
  });

  document.addEventListener("click", (event) => {
    const abrir = event.target.closest("[data-modal]");
    if (abrir) {
      const modal = modales[abrir.dataset.modal];
      if (modal) {
        Object.values(modales).forEach((m) => m.open && m.close());
        document.body.classList.add("modal-abierto");
        if (typeof modal.showModal === "function") {
          modal.showModal();
        } else {
          modal.setAttribute("open", "");
        }
      }
      return;
    }

    const cerrar = event.target.closest("[data-cerrar-modal]");
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

// Lista fija de códigos ISO 3166-1 alpha-2. Se resuelve en el momento (sin red);
// los nombres se traducen con Intl.DisplayNames, que ya trae el navegador.
// Así el selector de país nunca depende de que una CDN externa responda a tiempo.
const CODIGOS_PAISES_ISO = [
  "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ",
  "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS",
  "BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN",
  "CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE",
  "EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF",
  "GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM",
  "HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM",
  "JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC",
  "LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK",
  "ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA",
  "NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG",
  "PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW",
  "SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS",
  "ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO",
  "TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI",
  "VN","VU","WF","WS","YE","YT","ZA","ZM","ZW",
];

// Ciudades principales de Colombia (la mayoría de quienes llenan este formulario),
// embebidas directamente: nada de descargar una base de datos mundial de ciudades
// (llegaba a pesar más de 2 MB comprimidos) solo para sugerir un puñado de nombres.
// Para cualquier otro país, el campo de ciudad sigue funcionando como texto libre.
const CIUDADES_COLOMBIA = [
  ["Leticia", "Amazonas"], ["Puerto Nariño", "Amazonas"],
  ["Medellín", "Antioquia"], ["Bello", "Antioquia"], ["Itagüí", "Antioquia"],
  ["Envigado", "Antioquia"], ["Sabaneta", "Antioquia"], ["Rionegro", "Antioquia"],
  ["Apartadó", "Antioquia"], ["Turbo", "Antioquia"], ["Caucasia", "Antioquia"],
  ["Copacabana", "Antioquia"], ["La Estrella", "Antioquia"], ["Girardota", "Antioquia"],
  ["Arauca", "Arauca"],
  ["Barranquilla", "Atlántico"], ["Soledad", "Atlántico"], ["Malambo", "Atlántico"],
  ["Puerto Colombia", "Atlántico"],
  ["Cartagena", "Bolívar"], ["Magangué", "Bolívar"], ["Turbaco", "Bolívar"],
  ["Bogotá", "Bogotá D.C."],
  ["Tunja", "Boyacá"], ["Duitama", "Boyacá"], ["Sogamoso", "Boyacá"], ["Chiquinquirá", "Boyacá"],
  ["Manizales", "Caldas"], ["La Dorada", "Caldas"], ["Chinchiná", "Caldas"],
  ["Florencia", "Caquetá"],
  ["Yopal", "Casanare"],
  ["Popayán", "Cauca"], ["Santander de Quilichao", "Cauca"],
  ["Valledupar", "Cesar"], ["Aguachica", "Cesar"],
  ["Quibdó", "Chocó"],
  ["Montería", "Córdoba"], ["Cereté", "Córdoba"], ["Lorica", "Córdoba"], ["Sahagún", "Córdoba"],
  ["Soacha", "Cundinamarca"], ["Facatativá", "Cundinamarca"], ["Zipaquirá", "Cundinamarca"],
  ["Chía", "Cundinamarca"], ["Girardot", "Cundinamarca"], ["Fusagasugá", "Cundinamarca"],
  ["Cajicá", "Cundinamarca"], ["Mosquera", "Cundinamarca"], ["Madrid", "Cundinamarca"],
  ["Inírida", "Guainía"],
  ["San José del Guaviare", "Guaviare"],
  ["Neiva", "Huila"], ["Pitalito", "Huila"], ["Garzón", "Huila"],
  ["Riohacha", "La Guajira"], ["Maicao", "La Guajira"],
  ["Santa Marta", "Magdalena"], ["Ciénaga", "Magdalena"],
  ["Villavicencio", "Meta"], ["Acacías", "Meta"], ["Granada", "Meta"],
  ["Pasto", "Nariño"], ["Ipiales", "Nariño"], ["Tumaco", "Nariño"],
  ["Cúcuta", "Norte de Santander"], ["Ocaña", "Norte de Santander"],
  ["Pamplona", "Norte de Santander"], ["Villa del Rosario", "Norte de Santander"],
  ["Mocoa", "Putumayo"],
  ["Armenia", "Quindío"], ["Calarcá", "Quindío"],
  ["Pereira", "Risaralda"], ["Dosquebradas", "Risaralda"], ["Santa Rosa de Cabal", "Risaralda"],
  ["San Andrés", "San Andrés y Providencia"],
  ["Bucaramanga", "Santander"], ["Floridablanca", "Santander"], ["Girón", "Santander"],
  ["Piedecuesta", "Santander"], ["Barrancabermeja", "Santander"],
  ["Sincelejo", "Sucre"], ["Corozal", "Sucre"],
  ["Ibagué", "Tolima"], ["Espinal", "Tolima"], ["Melgar", "Tolima"],
  ["Cali", "Valle del Cauca"], ["Palmira", "Valle del Cauca"], ["Buenaventura", "Valle del Cauca"],
  ["Tuluá", "Valle del Cauca"], ["Cartago", "Valle del Cauca"], ["Buga", "Valle del Cauca"],
  ["Yumbo", "Valle del Cauca"], ["Jamundí", "Valle del Cauca"],
  ["Mitú", "Vaupés"],
  ["Puerto Carreño", "Vichada"],
].map(([ciudad, departamento]) => `${ciudad}, ${departamento}`);

function setupPaisCiudad() {
  const inputPais = document.getElementById("pais");
  const inputPaisCodigo = document.getElementById("pais-codigo");
  const listaPaisSugerencias = document.getElementById("pais-suggestions");

  const inputCiudad = document.getElementById("ciudad");
  const listaSugerencias = document.getElementById("ciudad-suggestions");
  const hint = document.getElementById("hint-ciudad");

  const nombresPorIdioma = {
    es: new Intl.DisplayNames(["es"], { type: "region" }),
    en: new Intl.DisplayNames(["en"], { type: "region" }),
  };
  const codigosPaises = CODIGOS_PAISES_ISO;

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

  // "click" (no "mousedown") porque es el evento que de forma más confiable llega
  // después de un toque en móvil. El blur del input se retrasa un poco (ver abajo)
  // para darle tiempo a este click de ejecutarse antes de que se borre la selección.
  listaPaisSugerencias.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
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
    // Retraso corto: en móvil, el toque sobre una sugerencia dispara el blur del
    // input ANTES de que su propio "click" termine de procesarse. Si limpiáramos
    // aquí de inmediato, se perdería la selección que el usuario acaba de hacer.
    setTimeout(() => {
      ocultarSugerenciasPais();
      if (!inputPaisCodigo.value) {
        inputPais.value = "";
        actualizarCiudades("");
      }
    }, 200);
  });

  const MAX_SUGERENCIAS_MOSTRADAS = 200;
  let ciudadesPais = [];

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

  listaSugerencias.addEventListener("click", (event) => {
    if (event.target.tagName === "LI" && !event.target.classList.contains("autocomplete-hint")) {
      inputCiudad.value = event.target.textContent;
      ocultarSugerencias();
    }
  });

  inputCiudad.addEventListener("input", mostrarSugerencias);
  inputCiudad.addEventListener("focus", mostrarSugerencias);
  inputCiudad.addEventListener("blur", () => setTimeout(ocultarSugerencias, 200));

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
    ciudadesPais = codigoPais === "CO" ? CIUDADES_COLOMBIA : [];
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
