(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var hero = document.getElementById("inicio");
  var body = document.body;
  var intro = document.getElementById("intro");

  function lanzarHero() {
    requestAnimationFrame(function () {
      hero.classList.add("play");
    });
  }

  function terminarIntro() {
    if (!intro) { lanzarHero(); return; }
    intro.classList.add("terminado");
    body.classList.remove("intro-activa");
    lanzarHero();
    setTimeout(function () {
      intro.style.display = "none";
    }, 550);
  }

  if (!intro || reduce) {
    if (intro) { intro.style.display = "none"; }
    body.classList.remove("intro-activa");
    lanzarHero();
  } else {
    requestAnimationFrame(function () {
      intro.classList.add("jugar");
    });
    var saltar = function () { terminarIntro(); };
    intro.addEventListener("click", saltar, { once: true });
    setTimeout(terminarIntro, 2000);
  }

  var navPill = document.getElementById("navpill");
  if ("IntersectionObserver" in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        navPill.classList.toggle("mostrar", !en.isIntersecting);
      });
    }, { threshold: 0 });
    navObs.observe(hero);
  } else {
    navPill.classList.add("mostrar");
  }

  function revelar(selector) {
    var items = Array.prototype.slice.call(document.querySelectorAll(selector));
    if ("IntersectionObserver" in window && !reduce) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("ver");
            obs.unobserve(en.target);
          }
        });
      }, { threshold: 0.15 });
      items.forEach(function (i) { obs.observe(i); });
    } else {
      items.forEach(function (i) { i.classList.add("ver"); });
    }
    return items;
  }

  revelar(".foto");
  revelar(".encabezado");
  revelar(".dato");
  revelar(".ubicacion-tarjeta");
  var puertas = revelar(".puerta");

  var barra = document.querySelector(".scroll-progreso span");
  if (barra) {
    var actualizarBarra = function () {
      var altura = document.documentElement.scrollHeight - window.innerHeight;
      var progreso = altura > 0 ? (window.scrollY / altura) * 100 : 0;
      barra.style.width = progreso + "%";
    };
    window.addEventListener("scroll", actualizarBarra, { passive: true });
    actualizarBarra();
  }

  var parallax = document.getElementById("heroParallax");
  if (parallax && !reduce) {
    var actualizarParallax = function () {
      var y = window.scrollY;
      if (y < hero.offsetHeight) {
        parallax.style.transform = "translateY(" + (y * 0.18) + "px)";
      }
    };
    window.addEventListener("scroll", actualizarParallax, { passive: true });
  }

  puertas.forEach(function (puerta) {
    var btn = puerta.querySelector(".puerta-toggle");
    btn.addEventListener("click", function () {
      var abierta = puerta.classList.contains("abierta");
      puertas.forEach(function (otra) {
        if (otra !== puerta) {
          otra.classList.remove("abierta");
          otra.querySelector(".puerta-toggle").setAttribute("aria-expanded", "false");
        }
      });
      puerta.classList.toggle("abierta", !abierta);
      btn.setAttribute("aria-expanded", String(!abierta));
      if (!abierta) {
        setTimeout(function () {
          puerta.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
        }, 120);
      }
    });

    var form = puerta.querySelector(".puerta-form");
    var gracias = puerta.querySelector(".gracias");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      form.style.display = "none";
      gracias.classList.add("ver");
    });
  });
})();
