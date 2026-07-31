import { escapeHtml, COLORES, interpolarColor, formatearDiasFaltantes } from "./utils.js";

export function renderDonut(contenedor, datos, { alClicSegmento } = {}) {
  const visibles = datos.filter((d) => d.valor > 0);
  const total = visibles.reduce((suma, d) => suma + d.valor, 0);
  if (!visibles.length || total === 0) {
    contenedor.innerHTML = `<span class="chart-empty">Sin datos todavía</span>`;
    return;
  }

  const tam = 160;
  const radio = 58;
  const grosor = 24;
  const centro = tam / 2;
  const circunferencia = 2 * Math.PI * radio;

  let acumulado = 0;
  const segmentos = visibles.map((d, i) => {
    const pct = d.valor / total;
    const largo = pct * circunferencia;
    const seg = {
      etiqueta: d.etiqueta,
      codigo: d.codigo ?? d.etiqueta,
      valor: d.valor,
      pct: Math.round(pct * 100),
      color: COLORES[i % COLORES.length],
      largo,
      offset: -acumulado,
    };
    acumulado += largo;
    return seg;
  });

  const svgNS = "http://www.w3.org/2000/svg";
  contenedor.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "donut-chart-wrap";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${tam} ${tam}`);
  svg.classList.add("donut-chart-svg");

  const g = document.createElementNS(svgNS, "g");
  g.setAttribute("transform", `rotate(-90 ${centro} ${centro})`);

  const pista = document.createElementNS(svgNS, "circle");
  pista.setAttribute("cx", centro);
  pista.setAttribute("cy", centro);
  pista.setAttribute("r", radio);
  pista.setAttribute("stroke-width", grosor);
  pista.setAttribute("class", "donut-pista");
  g.appendChild(pista);

  const centroValor = document.createElementNS(svgNS, "text");
  centroValor.setAttribute("x", centro);
  centroValor.setAttribute("y", centro - 3);
  centroValor.setAttribute("text-anchor", "middle");
  centroValor.setAttribute("class", "donut-centro-valor");
  centroValor.textContent = total;

  const centroEtiqueta = document.createElementNS(svgNS, "text");
  centroEtiqueta.setAttribute("x", centro);
  centroEtiqueta.setAttribute("y", centro + 15);
  centroEtiqueta.setAttribute("text-anchor", "middle");
  centroEtiqueta.setAttribute("class", "donut-centro-etiqueta");
  centroEtiqueta.textContent = "Total";

  function mostrarInfo(seg) {
    centroValor.textContent = seg ? seg.valor : total;
    centroEtiqueta.textContent = seg ? `${seg.etiqueta} · ${seg.pct}%` : "Total";
  }

  const circulos = [];
  const filasLeyenda = [];

  function activarSegmento(indice) {
    mostrarInfo(segmentos[indice]);
    circulos.forEach((c, j) => c.classList.toggle("is-atenuado", j !== indice));
    filasLeyenda.forEach((f, j) => f.classList.toggle("is-activa", j === indice));
  }

  function desactivarSegmento() {
    mostrarInfo(null);
    circulos.forEach((c) => c.classList.remove("is-atenuado"));
    filasLeyenda.forEach((f) => f.classList.remove("is-activa"));
  }

  segmentos.forEach((seg, i) => {
    const circ = document.createElementNS(svgNS, "circle");
    circ.setAttribute("cx", centro);
    circ.setAttribute("cy", centro);
    circ.setAttribute("r", radio);
    circ.setAttribute("stroke", seg.color);
    circ.setAttribute("stroke-width", grosor);
    circ.setAttribute("fill", "none");
    circ.setAttribute("stroke-dashoffset", seg.offset);
    circ.setAttribute("stroke-dasharray", `0 ${circunferencia}`);
    circ.dataset.final = `${seg.largo} ${circunferencia - seg.largo}`;
    circ.classList.add("donut-segmento");
    circ.addEventListener("mouseenter", () => activarSegmento(i));
    circ.addEventListener("mouseleave", desactivarSegmento);
    if (alClicSegmento) {
      circ.classList.add("donut-segmento-clicable");
      circ.addEventListener("click", () => alClicSegmento(seg));
    }
    circulos.push(circ);
    g.appendChild(circ);
  });

  svg.appendChild(g);
  svg.appendChild(centroValor);
  svg.appendChild(centroEtiqueta);

  const legend = document.createElement("ul");
  legend.className = "donut-legend-nueva";
  segmentos.forEach((seg, i) => {
    const li = document.createElement("li");
    li.className = "donut-legend-fila";
    li.innerHTML = `
      <span class="donut-legend-dot" style="background:${seg.color}"></span>
      <span class="donut-legend-etiqueta" title="${escapeHtml(seg.etiqueta)}">${escapeHtml(seg.etiqueta)}</span>
      <span class="donut-legend-valor">${seg.valor}</span>
      <span class="donut-legend-pct">${seg.pct}%</span>
    `;
    li.addEventListener("mouseenter", () => activarSegmento(i));
    li.addEventListener("mouseleave", desactivarSegmento);
    if (alClicSegmento) {
      li.classList.add("donut-legend-clicable");
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.addEventListener("click", () => alClicSegmento(seg));
      li.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          alClicSegmento(seg);
        }
      });
    }
    filasLeyenda.push(li);
    legend.appendChild(li);
  });

  wrap.append(svg, legend);
  contenedor.appendChild(wrap);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    circulos.forEach((c) => c.setAttribute("stroke-dasharray", c.dataset.final));
    return;
  }

  requestAnimationFrame(() => {
    circulos.forEach((c, i) => {
      c.style.transition = `stroke-dasharray 600ms ease ${i * 80}ms`;
      c.setAttribute("stroke-dasharray", c.dataset.final);
    });
  });
}

export function renderColumnChart(contenedor, datos, { alClicBarra } = {}) {
  const visibles = datos.filter((d) => d.valor > 0);
  if (!visibles.length) {
    contenedor.innerHTML = `<span class="chart-empty">Sin datos todavía</span>`;
    return;
  }

  const grande = contenedor.classList.contains("chart-slot-grande");
  const alto = grande ? 240 : 160;
  const ancho = 600;
  const padIzq = 20;
  const padDer = 20;
  const padArriba = 24;
  const padAbajo = 30;
  const anchoUtil = ancho - padIzq - padDer;
  const altoUtil = alto - padArriba - padAbajo;
  const base = padArriba + altoUtil;

  const max = Math.max(...visibles.map((d) => d.valor), 1);
  const anchoBanda = anchoUtil / visibles.length;
  const anchoBarra = Math.min(anchoBanda * 0.56, 48);

  const barras = visibles.map((d, i) => {
    const cx = padIzq + anchoBanda * i + anchoBanda / 2;
    const alturaFinal = Math.max(2, (d.valor / max) * altoUtil);
    const color = interpolarColor("#bcdcf5", "#05559c", visibles.length === 1 ? 1 : i / (visibles.length - 1));
    return { ...d, cx, alturaFinal, color };
  });

  const svgNS = "http://www.w3.org/2000/svg";
  contenedor.innerHTML = "";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${ancho} ${alto}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", alto);
  svg.classList.add("columnas-chart");

  [0, 0.5, 1].forEach((frac) => {
    const y = padArriba + altoUtil * frac;
    const linea = document.createElementNS(svgNS, "line");
    linea.setAttribute("x1", padIzq);
    linea.setAttribute("x2", ancho - padDer);
    linea.setAttribute("y1", y);
    linea.setAttribute("y2", y);
    linea.setAttribute("class", "linea-grid");
    svg.appendChild(linea);
  });

  const rects = [];
  barras.forEach((b) => {
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", b.cx - anchoBarra / 2);
    rect.setAttribute("width", anchoBarra);
    rect.setAttribute("y", base);
    rect.setAttribute("height", 0);
    rect.setAttribute("rx", 4);
    rect.setAttribute("fill", b.color);
    rect.classList.add("columna-barra");
    rect.dataset.finalY = base - b.alturaFinal;
    rect.dataset.finalAltura = b.alturaFinal;
    if (alClicBarra) {
      rect.classList.add("columna-barra-clicable");
      rect.setAttribute("role", "button");
      rect.setAttribute("tabindex", "0");
      rect.setAttribute("aria-label", `Ver clientes: ${b.etiqueta}`);
      rect.addEventListener("click", () => alClicBarra(b));
      rect.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          alClicBarra(b);
        }
      });
    }
    svg.appendChild(rect);
    rects.push(rect);

    const valor = document.createElementNS(svgNS, "text");
    valor.setAttribute("x", b.cx);
    valor.setAttribute("y", Math.max(12, base - b.alturaFinal - 8));
    valor.setAttribute("text-anchor", "middle");
    valor.setAttribute("class", "columna-valor");
    valor.textContent = b.valor;
    svg.appendChild(valor);

    const etiqueta = document.createElementNS(svgNS, "text");
    etiqueta.setAttribute("x", b.cx);
    etiqueta.setAttribute("y", alto - 8);
    etiqueta.setAttribute("text-anchor", "middle");
    etiqueta.setAttribute("class", "linea-etiqueta");
    etiqueta.textContent = b.etiqueta;
    svg.appendChild(etiqueta);
  });

  contenedor.appendChild(svg);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    rects.forEach((r) => {
      r.setAttribute("y", r.dataset.finalY);
      r.setAttribute("height", r.dataset.finalAltura);
    });
    return;
  }

  requestAnimationFrame(() => {
    rects.forEach((r, i) => {
      r.style.transition = `y 500ms ease ${i * 40}ms, height 500ms ease ${i * 40}ms`;
      r.setAttribute("y", r.dataset.finalY);
      r.setAttribute("height", r.dataset.finalAltura);
    });
  });
}

export function renderLineChart(contenedor, datos) {
  if (!datos.length) {
    contenedor.innerHTML = `<span class="chart-empty">Sin datos todavía</span>`;
    return;
  }

  const grande = contenedor.classList.contains("chart-slot-grande");
  const alto = grande ? 240 : 140;
  const ancho = 600;
  const padIzq = 28;
  const padDer = 16;
  const padArriba = 26;
  const padAbajo = 26;
  const anchoUtil = ancho - padIzq - padDer;
  const altoUtil = alto - padArriba - padAbajo;

  const max = Math.max(...datos.map((d) => d.valor), 1);
  const puntos = datos.map((d, i) => ({
    ...d,
    x: padIzq + (datos.length === 1 ? anchoUtil / 2 : (anchoUtil * i) / (datos.length - 1)),
    y: padArriba + altoUtil - (d.valor / max) * altoUtil,
  }));

  const lineaD = puntos.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const base = padArriba + altoUtil;
  const areaD = `${lineaD} L ${puntos[puntos.length - 1].x} ${base} L ${puntos[0].x} ${base} Z`;
  const gradId = `linea-gradiente-${Math.random().toString(36).slice(2, 8)}`;

  const svgNS = "http://www.w3.org/2000/svg";
  contenedor.innerHTML = "";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${ancho} ${alto}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", alto);
  svg.classList.add("linea-chart");

  const defs = document.createElementNS(svgNS, "defs");
  defs.innerHTML = `
    <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--coyote-azul)" stop-opacity="0.3" />
      <stop offset="100%" stop-color="var(--coyote-azul)" stop-opacity="0" />
    </linearGradient>
  `;
  svg.appendChild(defs);

  [0, 0.5, 1].forEach((frac) => {
    const y = padArriba + altoUtil * frac;
    const linea = document.createElementNS(svgNS, "line");
    linea.setAttribute("x1", padIzq);
    linea.setAttribute("x2", ancho - padDer);
    linea.setAttribute("y1", y);
    linea.setAttribute("y2", y);
    linea.setAttribute("class", "linea-grid");
    svg.appendChild(linea);
  });

  const area = document.createElementNS(svgNS, "path");
  area.setAttribute("d", areaD);
  area.setAttribute("fill", `url(#${gradId})`);
  area.setAttribute("class", "linea-area");
  svg.appendChild(area);

  const linea = document.createElementNS(svgNS, "path");
  linea.setAttribute("d", lineaD);
  linea.setAttribute("class", "linea-trazo");
  svg.appendChild(linea);

  puntos.forEach((p) => {
    const punto = document.createElementNS(svgNS, "circle");
    punto.setAttribute("cx", p.x);
    punto.setAttribute("cy", p.y);
    punto.setAttribute("r", 4);
    punto.setAttribute("class", "linea-punto");
    svg.appendChild(punto);

    const etiqueta = document.createElementNS(svgNS, "text");
    etiqueta.setAttribute("x", p.x);
    etiqueta.setAttribute("y", alto - 6);
    etiqueta.setAttribute("text-anchor", "middle");
    etiqueta.setAttribute("class", "linea-etiqueta");
    etiqueta.textContent = p.etiqueta;
    svg.appendChild(etiqueta);
  });

  const guia = document.createElementNS(svgNS, "line");
  guia.setAttribute("y1", padArriba);
  guia.setAttribute("y2", base);
  guia.setAttribute("class", "linea-guia");
  svg.appendChild(guia);

  const puntoHover = document.createElementNS(svgNS, "circle");
  puntoHover.setAttribute("r", 6);
  puntoHover.setAttribute("class", "linea-punto-hover");
  svg.appendChild(puntoHover);

  const tooltip = document.createElementNS(svgNS, "g");
  tooltip.setAttribute("class", "linea-tooltip");
  const tooltipAncho = 116;
  const tooltipAlto = 42;
  const tooltipFondo = document.createElementNS(svgNS, "rect");
  tooltipFondo.setAttribute("width", tooltipAncho);
  tooltipFondo.setAttribute("height", tooltipAlto);
  tooltipFondo.setAttribute("rx", 7);
  tooltipFondo.setAttribute("class", "linea-tooltip-fondo");
  const tooltipMes = document.createElementNS(svgNS, "text");
  tooltipMes.setAttribute("x", tooltipAncho / 2);
  tooltipMes.setAttribute("y", 17);
  tooltipMes.setAttribute("text-anchor", "middle");
  tooltipMes.setAttribute("class", "linea-tooltip-mes");
  const tooltipValor = document.createElementNS(svgNS, "text");
  tooltipValor.setAttribute("x", tooltipAncho / 2);
  tooltipValor.setAttribute("y", 33);
  tooltipValor.setAttribute("text-anchor", "middle");
  tooltipValor.setAttribute("class", "linea-tooltip-valor");
  tooltip.append(tooltipFondo, tooltipMes, tooltipValor);
  svg.appendChild(tooltip);

  function mostrarHover(p) {
    guia.setAttribute("x1", p.x);
    guia.setAttribute("x2", p.x);
    puntoHover.setAttribute("cx", p.x);
    puntoHover.setAttribute("cy", p.y);
    const tooltipX = Math.min(Math.max(p.x - tooltipAncho / 2, padIzq), ancho - padDer - tooltipAncho);
    const tooltipY = Math.max(p.y - tooltipAlto - 14, 2);
    tooltip.setAttribute("transform", `translate(${tooltipX} ${tooltipY})`);
    tooltipMes.textContent = p.etiqueta;
    tooltipValor.textContent = `${p.valor} registro${p.valor === 1 ? "" : "s"}`;
    svg.classList.add("con-hover");
  }

  function ocultarHover() {
    svg.classList.remove("con-hover");
  }

  const overlay = document.createElementNS(svgNS, "rect");
  overlay.setAttribute("x", 0);
  overlay.setAttribute("y", 0);
  overlay.setAttribute("width", ancho);
  overlay.setAttribute("height", alto);
  overlay.setAttribute("fill", "transparent");
  overlay.setAttribute("class", "linea-overlay");
  overlay.addEventListener("mousemove", (evento) => {
    const punto = svg.createSVGPoint();
    punto.x = evento.clientX;
    punto.y = evento.clientY;
    const cursor = punto.matrixTransform(svg.getScreenCTM().inverse());
    let cercano = puntos[0];
    let mejorDistancia = Infinity;
    puntos.forEach((p) => {
      const distancia = Math.abs(p.x - cursor.x);
      if (distancia < mejorDistancia) {
        mejorDistancia = distancia;
        cercano = p;
      }
    });
    mostrarHover(cercano);
  });
  overlay.addEventListener("mouseleave", ocultarHover);
  svg.appendChild(overlay);

  contenedor.appendChild(svg);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const longitud = linea.getTotalLength();
  linea.style.strokeDasharray = `${longitud}`;
  linea.style.strokeDashoffset = `${longitud}`;
  area.style.opacity = "0";
  requestAnimationFrame(() => {
    linea.style.transition = "stroke-dashoffset 700ms ease";
    linea.style.strokeDashoffset = "0";
    area.style.transition = "opacity 500ms ease 250ms";
    area.style.opacity = "1";
  });
}

export function renderizarTablaFechas(contenedorId, filas) {
  const tbody = document.getElementById(contenedorId);
  if (filas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="chart-empty">Sin fechas registradas</td></tr>`;
    return;
  }
  tbody.innerHTML = filas
    .map((f) => {
      const urgente = f.dias_faltantes <= 7;
      return `
      <tr>
        <td>${escapeHtml(f.nombre)}</td>
        <td>${new Date(f.fecha).toLocaleDateString("es-CO", { day: "2-digit", month: "long" })}</td>
        <td class="${urgente ? "dias-restantes-urgente" : ""}">${formatearDiasFaltantes(f.dias_faltantes)}</td>
      </tr>`;
    })
    .join("");
}
