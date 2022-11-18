const { verifyPassword, createHash } = require("../utils/isValidPassword.js");
const { users } = require("../daos")();
const { Strategy: LocalStrategy } = require("passport-local");
const sendMail = require("../utils/sendMail");

initialize = (passport) => {
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },

            async (email, password, done) => {
                try {
                    const user = await users.getByEmail(email);
                    if (!user)
                        return done(null, false, {
                            message: "Usuario no encontrado",
                        });

                    if (!verifyPassword(password, user))
                        return done(null, false, {
                            message: "Password incorrecto",
                        });

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.use(
        "register",
        new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {
            try {
                const user = await users.getByEmail(email);
                if (user)
                    return done(null, false, {
                        message: "El nombre de usuario ya esta en uso.",
                    });

                const newUser = {
                    email: req.body.email,
                    password: createHash(password),
                    age: req.body.age,
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    photo_url: req.file.filename,
                };

                const response = await users.createItem(newUser);
                await sendMail(process.env.ADMIN_EMAIL, "Nuevo Registro", JSON.stringify(newUser, null, 2));
                return done(null, response);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await users.getItemById(id);
        done(null, user);
    });
};

module.exports = initialize;
