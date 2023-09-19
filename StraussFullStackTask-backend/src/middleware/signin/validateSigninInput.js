function validateSigninInput(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      success: false,
      msg: "Username and password are required",
    });
  }

  next(); // Move to the next middleware or route handler
}

module.exports = validateSigninInput;
