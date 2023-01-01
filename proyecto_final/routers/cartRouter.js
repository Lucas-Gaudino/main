const express = require("express");
const { Router } = express;
const cartRouter = Router();
const { carts, products, users } = require("../daos")();
const sendMail = require("../utils/sendMail");
const sendSMS = require("../utils/sendSMS");
const sendWhatsapp = require("../utils/sendWhatsapp");

cartRouter.post("/", async (req, res) => {
    if (req.user.cart_id) return carts.getItemById(req.user.cart_id);
    const newCartId = await carts.createCart(req.user._id);
    return res.json(newCartId);
});

cartRouter.delete("/:id", async (req, res) => {
    await carts.deleteItem(req.params.id);
    return res.sendStatus(204);
});

cartRouter.get("/:id/productos", async (req, res) => {
    const products = await carts.getCartProducts(req.params.id);
    if (products) return res.json(products);
    return res.json(null);
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    await carts.deleteCartProduct(req.params.id, req.params.id_prod);
    return res.sendStatus(204);
});

cartRouter.post("/:id/productos/", async (req, res) => {
    const product = await products.getItemById(req.body.prod_id);
    await carts.addCartProduct(req.params.id, product);
    return res.sendStatus(204);
});

cartRouter.post("/:id", async (req, res) => {
    const cart = await carts.getItemById(req.params.id);
    const formattedProducts = cart.products.map(
        (product) =>
            `Producto: ${product.name} <br />
        Precio: ${product.price}
        `
    );
    await sendMail(
        null,
        `Nuevo pedido de ${req.user.name} - ${req.user.email}`,
        `<p>${formattedProducts.join("</p><p>")}</p>`
    );
    const newUser = await users.deleteCart(cart._id);
    console.log(newUser);
    await sendSMS("La orden fue confirmada");
    await sendWhatsapp("Se ha creado una nueva orden de compra de parte de: " + req.user.name);
    return res.redirect("/home");
});

module.exports = cartRouter;
