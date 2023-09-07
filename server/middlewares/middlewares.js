//check if loggedin user
function auth(req, res, next) {
  if (req.session?.id) return next();
  res.status(401).json("You must login to perform this request");
}

module.exports = { auth };
