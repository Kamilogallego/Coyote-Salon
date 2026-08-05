let qrDataUrl = null;

export function cargarCompartir() {
  const url = "https://coyote-salon.onrender.com/coyote/formulario/formulario.html";
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
