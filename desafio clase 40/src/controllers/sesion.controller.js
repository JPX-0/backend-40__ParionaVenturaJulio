const env = require("../utils/config/env.config");

const renderLogout = (req, res) => {
  const user = req.user.email;
  req.logout();
  req.session.destroy(err => {
    if(err) res.clearCookie(env.SESSION_NAME);
    res.render("logout", { nombre: user });
  });
  res.clearCookie(env.SESSION_NAME);
}
const renderError = (req, res) => {
  const page = `${req.url.split("error")[0]}error` == "/register-error" ? "SIGNUP" : "LOGIN";
  const message = `USER ERROR ${page}`;
  res.render('error-session', { title: page , message });
}

module.exports = { renderLogout, renderError }