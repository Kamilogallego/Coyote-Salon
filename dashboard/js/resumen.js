import { renderDonut, renderColumnChart, renderLineChart, renderizarTablaFechas } from "./graficas.js";
import { aplicarFiltroDesdeResumen, aplicarFiltroEdadDesdeResumen, verDetalleCliente } from "./clientes.js";
import {
  ETIQUETAS_MEDIO,
  ETIQUETAS_GENERO,
  ETIQUETAS_DOCUMENTO,
  escapeHtml,
  formatearMes,
  formatearFecha,
  formatearFechaISO,
} from "./utils.js";

function irAClientesFiltrado(aplicarFiltro) {
  aplicarFiltro();
  document.querySelector('.nav-item[data-page="clientes"]').click();
}

export async function cargarEstadisticas() {
  const res = await fetch("/api/estadisticas", { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  const stats = await res.json();

  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-nuevos").textContent = stats.nuevosEsteMes;
  document.getElementById("stat-pareja").textContent = stats.conPareja;
  document.getElementById("stat-hijos").textContent = stats.conHijos;

  const medioDatos = stats.medioContacto.map((m) => ({
    etiqueta: ETIQUETAS_MEDIO[m.medio_contacto] || m.medio_contacto,
    codigo: m.medio_contacto,
    valor: m.cantidad,
  }));
  const edadDatos = stats.rangoEdad.map((r) => ({ etiqueta: r.rango, valor: r.cantidad }));
  const crecimientoDatos = stats.crecimientoMensual.map((c) => ({
    etiqueta: formatearMes(c.mes),
    valor: c.cantidad,
  }));
  const generoDatos = stats.genero.map((g) => ({
    etiqueta: ETIQUETAS_GENERO[g.genero] || g.genero,
    codigo: g.genero,
    valor: g.cantidad,
  }));
  const sinNovedadesDatos = stats.sinNovedadesPorMedio.map((n) => ({
    etiqueta: ETIQUETAS_MEDIO[n.medio_contacto] || n.medio_contacto,
    valor: n.cantidad,
  }));

  renderDonut(document.getElementById("resumen-medio"), medioDatos, {
    alClicSegmento: (seg) => irAClientesFiltrado(() => aplicarFiltroDesdeResumen("medio", seg.codigo)),
  });
  renderColumnChart(document.getElementById("resumen-edad"), edadDatos, {
    alClicBarra: (barra) => irAClientesFiltrado(() => aplicarFiltroEdadDesdeResumen(barra.etiqueta)),
  });
  renderLineChart(document.getElementById("resumen-crecimiento"), crecimientoDatos);
  renderDonut(document.getElementById("resumen-genero"), generoDatos, {
    alClicSegmento: (seg) => irAClientesFiltrado(() => aplicarFiltroDesdeResumen("genero", seg.codigo)),
  });
  renderDonut(document.getElementById("resumen-novedades"), sinNovedadesDatos);

  document.getElementById("resumen-novedades-total").textContent =
    stats.total > 0
      ? `${stats.sinNovedadesTotal} de ${stats.total} (${Math.round((stats.sinNovedadesTotal / stats.total) * 100)}%)`
      : "";

  renderLineChart(document.getElementById("chart-crecimiento"), crecimientoDatos);

  document.getElementById("tabla-crecimiento-mensual").innerHTML = stats.crecimientoMensual
    .map((c, i) => {
      const anterior = i > 0 ? stats.crecimientoMensual[i - 1].cantidad : null;
      let variacion = "—";
      if (anterior !== null) {
        if (anterior === 0) {
          variacion = c.cantidad > 0 ? "▲ nuevo" : "—";
        } else {
          const cambio = Math.round(((c.cantidad - anterior) / anterior) * 100);
          variacion =
            cambio > 0 ? `▲ ${cambio}%` : cambio < 0 ? `▼ ${Math.abs(cambio)}%` : "— 0%";
        }
      }
      const claseVariacion = variacion.startsWith("▲")
        ? "variacion-positiva"
        : variacion.startsWith("▼")
        ? "variacion-negativa"
        : "";
      return `
        <tr>
          <td>${escapeHtml(formatearMes(c.mes))}</td>
          <td>${c.cantidad}</td>
          <td class="${claseVariacion}">${variacion}</td>
        </tr>`;
    })
    .join("");

  renderizarTablaFechas("tabla-cumpleanos", stats.proximosCumpleanos, { alClicVer: verDetalleCliente });
  renderizarTablaFechas("tabla-aniversarios", stats.proximosAniversarios, { alClicVer: verDetalleCliente });
}

let mesActual = new Date();
mesActual.setDate(1);

export async function cargarClientesDelMes() {
  document.getElementById("mes-actual-titulo").textContent = mesActual.toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric",
  });

  const inicio = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
  const fin = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);

  const params = new URLSearchParams({
    registrado_desde: formatearFechaISO(inicio),
    registrado_hasta: formatearFechaISO(fin),
  });

  const res = await fetch(`/api/clientes?${params.toString()}`, { credentials: "include" });
  if (res.status === 401) {
    window.location.href = "login.html";
    return;
  }
  const clientesDelMes = await res.json();

  document.getElementById("mes-resumen").textContent = `${clientesDelMes.length} cliente(s) registrados este mes`;

  document.getElementById("mes-tabla").innerHTML = clientesDelMes
    .map(
      (c) => `
      <tr>
        <td>${escapeHtml(c.nombre)}</td>
        <td>${ETIQUETAS_DOCUMENTO[c.tipo_documento] || escapeHtml(c.tipo_documento)}: ${escapeHtml(c.cedula)}</td>
        <td>${ETIQUETAS_MEDIO[c.medio_contacto] || escapeHtml(c.medio_contacto)}</td>
        <td>${formatearFecha(c.fecha_registro)}</td>
      </tr>
    `
    )
    .join("");
}

document.getElementById("mes-anterior").addEventListener("click", () => {
  mesActual.setMonth(mesActual.getMonth() - 1);
  cargarClientesDelMes();
});

document.getElementById("mes-siguiente").addEventListener("click", () => {
  mesActual.setMonth(mesActual.getMonth() + 1);
  cargarClientesDelMes();
});
