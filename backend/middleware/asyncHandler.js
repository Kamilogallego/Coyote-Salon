// Express 4 no captura errores lanzados dentro de un handler async: si una
// promesa se rechaza (ej. falla una query a la base de datos), el request
// se queda sin respuesta y la promesa rechazada queda sin manejar. Este
// wrapper reenvía cualquier error a next(), para que lo atrape el
// middleware de errores de server.js y responda con un 500 en vez de dejar
// al cliente esperando para siempre.
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
