const modalConfirmar = document.getElementById("modal-confirmar");
const confirmarTitulo = document.getElementById("confirmar-titulo");
const confirmarMensaje = document.getElementById("confirmar-mensaje");
const btnConfirmarAceptar = document.getElementById("btn-confirmar-aceptar");
const btnConfirmarCancelar = document.getElementById("btn-confirmar-cancelar");
const confirmarPasswordWrap = document.getElementById("confirmar-password-wrap");
const confirmarPasswordInput = document.getElementById("confirmar-password");
const confirmarPasswordError = document.getElementById("confirmar-password-error");
const btnTogglePassword = document.getElementById("btn-toggle-password");

btnTogglePassword.addEventListener("click", () => {
  const mostrar = confirmarPasswordInput.type === "password";
  confirmarPasswordInput.type = mostrar ? "text" : "password";
  btnTogglePassword.setAttribute("aria-pressed", String(mostrar));
  btnTogglePassword.setAttribute("aria-label", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
});

const PASSWORD_CONFIRMACION = "coyote123";

export function confirmarAccion(
  mensaje,
  { titulo = "Confirmar acción", textoAceptar = "Confirmar", peligro = true, requierePassword = false } = {}
) {
  confirmarTitulo.textContent = titulo;
  confirmarMensaje.textContent = mensaje;
  btnConfirmarAceptar.textContent = textoAceptar;
  modalConfirmar.classList.toggle("es-peligro", peligro);
  confirmarPasswordWrap.classList.toggle("is-oculto", !requierePassword);
  confirmarPasswordInput.value = "";
  confirmarPasswordInput.type = "password";
  btnTogglePassword.setAttribute("aria-pressed", "false");
  btnTogglePassword.setAttribute("aria-label", "Mostrar contraseña");
  confirmarPasswordError.textContent = "";
  modalConfirmar.showModal();
  if (requierePassword) confirmarPasswordInput.focus();

  return new Promise((resolve) => {
    const cerrar = (resultado) => {
      btnConfirmarAceptar.removeEventListener("click", onAceptar);
      btnConfirmarCancelar.removeEventListener("click", onCancelar);
      confirmarPasswordInput.removeEventListener("keydown", onEnterPassword);
      modalConfirmar.removeEventListener("cancel", onCancelar);
      modalConfirmar.close();
      resolve(resultado);
    };
    const onAceptar = () => {
      if (requierePassword && confirmarPasswordInput.value !== PASSWORD_CONFIRMACION) {
        confirmarPasswordError.textContent = "Contraseña incorrecta";
        confirmarPasswordInput.focus();
        return;
      }
      cerrar(true);
    };
    const onCancelar = () => cerrar(false);
    const onEnterPassword = (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        onAceptar();
      }
    };
    btnConfirmarAceptar.addEventListener("click", onAceptar);
    btnConfirmarCancelar.addEventListener("click", onCancelar);
    confirmarPasswordInput.addEventListener("keydown", onEnterPassword);
    modalConfirmar.addEventListener("cancel", onCancelar);
  });
}
