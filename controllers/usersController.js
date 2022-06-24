function getUsers(req, res, next) {
    res.render("users", {
      title: "users chat-app",
    });
  }
  
  module.exports = {
    getUsers,
  };
  