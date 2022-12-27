import { Application,Router } from "https://deno.land/x/oak/mod.ts";
import ProductControllers from "./d1.ts";


const app = new Application();
const router = new Router();


router.get('/products',ProductControllers.getAll);
router.get('/products/:id',ProductControllers.getOne);
router.post('/products',ProductControllers.addOne);
router.put('/products/:id',ProductControllers.updateOne);
router.delete('/products/:id',ProductControllers.deleteOne);

app.use(router.routes());

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });