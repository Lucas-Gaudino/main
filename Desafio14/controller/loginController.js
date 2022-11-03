export const loginController = {
    get: (req, res, next) => {
        try {
            if (req.session.username != undefined) {
              res.render("pages/home", { name: req.session.username });
            } else {
              res.render("pages/login");
            }
          } catch (error) {
            return res
              .status(500)
              .send({ status: "Get page Log In error", body: error });
          }
    },
    postLogin: (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
        if (username == "admin" && password == "admin") {
            req.session.username = username;
            res.redirect("/home");
        } else {
            res.render("pages/login", { error: "Usuario o contraseña incorrectos" });
        }
    },
    auth: (req, res, next) => {
        if (req.session.username) {
            next();
        } else {
            res.redirect("pages/errorLogin");
        }
    }
}

// Language: javascript
// Path: controller\productController.js
// Compare this snippet from server.js:
