const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");

const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("./config/passport");

const compression = require("compression");

const connectDB = require("./config/db");
const logger = require("./utils/logger");

const normalizeMessages = require("./utils/normalizeMessages");

const yargs = require("yargs");
const MessageService = require("./services/MessageService");
const ProductService = require("./services/ProductService");

const randomRouter = require("./routes/randomRouter");
const appRouter = require("./routes/appRouter");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const graphQL = require("./graphQL/graphQL");

const server = () => {
    const app = express();
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);

    connectDB(process.env.MONGODB_URI);
    initializePassport(passport);

    const productService = new ProductService();
    const messageService = new MessageService();
    app.use("/graphql", graphQL());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            rolling: true,
            cookie: {
                maxAge: 1000 * 60 * 10,
            },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(express.static("./public"));

    app.use(compression());
    //app.use("/api", randomRouter);
    app.use("/auth", authRouter);
    app.use("/products", productRouter);
    app.use("/", appRouter);

    app.use((req, res, next) => {
        logger.info(`Ruta: ${req.path} Metodo: ${req.method}`);
        return next();
    });

    const PORT = process.env.PORT || 8080;

    app.engine(
        "hbs",
        engine({
            extname: ".hbs",
            defaultLayout: `${__dirname}/views/index.hbs`,
            layoutsDir: `${__dirname}/views/layouts`,
            partialsDir: `${__dirname}/views/partials`,
        })
    );

    app.set("views", "./views");
    app.set("view engine", "hbs");

    app.get("*", (req, res) => {
        logger.warn(`Ruta: ${req.path} Metodo: ${req.method}`);
        return res.status(404).json({ message: "page not found" });
    });

    io.on("connection", async (socket) => {
        console.log(`nuevo usuario id: ${socket.id}`);
        const messages = await messageService.getAll();

        socket.emit("success", normalizeMessages(messages));
        socket.on("addProduct", async (data) => {
            const newProduct = await productService.createProduct(data);
            io.emit("newProduct", newProduct);
        });

        //chat
        // socket.on("login", async (user) => {
        //     const messages = await messageService.getAll();
        //     normalizeMessages(messages);
        //     socket.emit("success", normalizeMessages(messages));
        //});

        // socket.on("addMessage", async (data) => {
        //     const newMessage = await messageService.createMessage(data);
        //     io.emit("newMessage", newMessage);
        // });
    });

    httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
};

module.exports = server;
