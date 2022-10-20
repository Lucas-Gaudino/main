import { createNFakeProducts } from "../models/mocks/index.js";

//Exporto y creo una funcion que controlle el producto

export const productController = {
    getData: async (req, res) => {
        try{
            let products = await createNFakeProducts(5);
            res.render('productslist', { products: products, productsExist: true });
        }
        catch(err){
            console.log(err);
        }
    }
}
