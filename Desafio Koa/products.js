const Router = require("koa-router");
const router = new Router({ prefix: "/products" });
module.exports = { products: router };

let products = [
    {
        id: 1,
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    },
    {
        id: 2,
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    },
    {
        id: 3,
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    }
];


/*API REST*/

// GET /api/productos/listar
router.get("/listar", async (ctx) => {
    if (products.length > 0) {
        ctx.body = products;
    } else {
        ctx.body = { error: 'No hay productos cargados' };
    }
});

// GET /api/productos/listar/:id

router.get("/listar/:id", async (ctx) => {
    const id = ctx.params.id;
    const product = products.find(product => product.id == id);
    if (product) {
        ctx.body = product;
    } else {
        ctx.body = { error: 'Producto no encontrado' };
    }
});

// POST /api/productos/guardar

router.post("/guardar", async (ctx) => {
    const product = ctx.request.body;
    products.push(product);
    ctx.body = product;
});

// PUT /api/productos/actualizar/:id

router.put("/actualizar/:id", async (ctx) => {
    const id = ctx.params.id;
    const product = ctx.request.body;
    const index = products.findIndex(product => product.id == id);
    if (index >= 0) {
        products[index] = product;
        ctx.body = product;
    } else {
        ctx.body = { error: 'Producto no encontrado' };
    }
});

// DELETE /api/productos/borrar/:id

router.delete("/borrar/:id", async (ctx) => {
    const id = ctx.params.id;
    const index = products.findIndex(product => product.id == id);
    if (index >= 0) {
        products.splice(index, 1);
        ctx.body = { message: 'Producto eliminado' };
    } else {
        ctx.body = { error: 'Producto no encontrado' };
    }
});

// Path: index.js