function getInbox(req, res, next) {
    res.render("inbox", {
      title: "Inbox chat-app",
    });
  }
  
  module.exports = {
    getInbox,
  };
  