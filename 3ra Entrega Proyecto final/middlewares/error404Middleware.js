//manejar errores como el profe

const error404Middleware = (req, res, next) => {
    return res.json({
        error: -2,
        descripcion: `Ruta ${req.url} método ${req.method} no implementada`,
    });
};

module.exports = error404Middleware;
