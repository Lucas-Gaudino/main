const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Usuarios = require("./models/usuarios");

const bcrypt = require("bcrypt");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");

const redis = require("redis");



const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }
const client = redis.createClient({
  legacyMode: true,
});
client.on('error', (err) => {
    console.log('ⓘ on error:', err);
});
client.connect();

const RedisStore = require("connect-redis")(session);


function esLaContraseña(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
  
  function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }
  
mongoose
  .connect("mongodb://localhost:27017/loginTDesafio",options)
  .then(() => console.log("Connected to DB"))
  .catch((e) => {
    console.error(e);
    throw "can not connect to the db";
  });

  
passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
      Usuarios.findOne({ username }, (err, user) => {
        if (err) return done(err);
  
        if (!user) {
          console.log("User Not Found with username " + username);
          return done(null, false);
        }
  
        if (!esLaContraseña(user, password)) {
          console.log("Invalid Password");
          return done(null, false);
        }
  
        //con lo siguiente quedas logueado, creas la session
        return done(null, user);
      });
    })
  );

    passport.use(
    "signup",
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            Usuarios.findOne({ username }, (err, user) => {
                if (err) return done(err);
                if (user) {
                    console.log("User already exists with username: " + username);
                    return done(null, false);
                } else {
                    const newUser = new Usuarios({
                        username: username,
                        password: createHash(password),
                    });
                    newUser.save((err) => {
                        if (err) {
                            console.log("Error in Saving user: " + err);
                            throw err;
                        }
                        console.log("User Registration succesful");
                        return done(null, newUser);
                    });
                }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
    });

passport.deserializeUser((id, done) => {
    Usuarios.findById(id, (err, user) => {
        done(err, user);
    });
});

const app = express();

app.use(
    session({
      store: new RedisStore({ host: "localhost", port: 6379, client, ttl: 300 }),
      secret: "keyboard cat",
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 86400000, // 1 dia
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );
  

  app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log(`Example app listening on port http://localhost:8000`);
});

app.get("/", routes.getRoot);
app.get("/login", routes.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);
app.get("/faillogin", routes.getFaillogin);
app.get("/signup", routes.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postSignup
);
app.get("/failsignup", routes.getFailsignup);
app.get("/logout", routes.getLogout);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/private", checkAuthentication, routes.getPrivate);

app.get("*", routes.get404);
