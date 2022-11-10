const { errorLogger } = require("../src/utils/loggers");

const loginController = {
  get: (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.redirect("/home");
      } else {
        res.status(200).render("pages/login");
      }
    } catch (error) {
      errorLogger.error({
        URL: req.originalUrl,
        method: req.method,
        error: error.message,
      });
      return res
        .status(500)
        .send({ status: "Get page Log In error", body: error });
    }
  },
  postLogin: (req, res) => {
    try {
      const { username } = req.user;
      req.session.username = username;
      res.status(200).redirect("/home");
    } catch (error) {
      errorLogger.error({
        URL: req.originalUrl,
        method: req.method,
        error: error.message,
      });
      return res.status(500).send({ status: "Log In error", body: error });
    }
  },

  errorLogin: (req, res) => {
    try {
      res.status(200).render("pages/errorLogin");
    } catch (error) {
      errorLogger.error({
        URL: req.originalUrl,
        method: req.method,
        error: error.message,
      });
      res.status(500).send({ status: "Log In error", body: error });
    }
  },
};

module.exports = { loginController };
