const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    let message =
      "User must be logged in to do that! Please log in or sign up.";
    res.status(302).render("login", { message: message });
  } else {
    next();
  }
};

module.exports = withAuth;
