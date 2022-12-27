import products from './db/productos.json' assert{ type:'json'};

const getAll = (ctx:any)=>{
    ctx.response.body = products;
}

const getOne = (ctx:any)=>{
    const product = products.find((p:any)=>p.id === ctx.params.id);
    if(product){
        ctx.response.body = product;
        ctx.response.status = 200;
    }else{
        ctx.response.body = {message: 'Product not found'};
        ctx.response.status = 404;
    }
}

const addOne = async (ctx:any)=>{
    const body = await ctx.request.body();
    products.push(body.value);
    ctx.response.body = {message: 'Product added'};
    ctx.response.status = 201;
}

const updateOne = async (ctx:any)=>{
    const body = await ctx.request.body();
    const product = products.find((p:any)=>p.id === ctx.params.id);
    if(product){
        product.nombreProducto = body.value.name;
        product.precio = body.value.price;
        ctx.response.body = {message: 'Product updated'};
        ctx.response.status = 200;
    }else{
        ctx.response.body = {message: 'Product not found'};
        ctx.response.status = 404;
    }
}

const deleteOne = (ctx:any)=>{
    const product = products.find((p:any)=>p.id === ctx.params.id);
    if(product){
        products.splice(products.indexOf(product), 1);
        ctx.response.body = {message: 'Product deleted'};
        ctx.response.status = 200;
    }else{
        ctx.response.body = {message: 'Product not found'};
        ctx.response.status = 404;
    }
}

export default {getAll, getOne, addOne, updateOne, deleteOne};