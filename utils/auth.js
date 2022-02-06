const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    console.log("\n---------User is not logged in!---------\n");
    res.redirect('/login');
  } else {
    console.log("User is logged in!");
    next();
  }
};

module.exports = withAuth;
