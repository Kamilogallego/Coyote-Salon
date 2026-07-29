document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      errorMsg.textContent = data.error || "No se pudo iniciar sesión";
      return;
    }

    window.location.href = "dashboard.html";
  } catch (err) {
    errorMsg.textContent = "Error de conexión con el servidor";
  }
});
