function getLogIn(req, res, next) {
  res.render("login", {
    title: "login chat-app",
  });
}

module.exports = {
  getLogIn,
};
