function getRoot(req, res) {
    res.render("index", {});
  }

  function getLogin(req, res) {
    if (req.isAuthenticated()) {
      const { username, password } = req.user;
      const user = { username, password };
      res.render("profileUser", { user });
    } else {
      res.render("login");
    }
  }

function getSignup(req, res) {
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render("profileUser", { user });
      } else {
        res.render("signup");
      }
  }

  function postLogin(req, res) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { user });
  }
  
  function postSignup(req, res) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { user });
  }

  function getFaillogin(req, res) {
    res.render("login-error", {});
  }
  
  function getFailsignup(req, res) {
    res.render("signup-error", {});
  }
  
  function getLogout(req, res) {
    req.logout();
    res.render("index");
  }
  
  function get404(req, res) {
    res.status(404).render("routing-error", {});
  }
  
    function getPrivate(req, res) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { user });
  }

    module.exports = {
    getRoot,
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getFaillogin,
    getFailsignup,
    getLogout,
    get404,
    getPrivate,
    };
    