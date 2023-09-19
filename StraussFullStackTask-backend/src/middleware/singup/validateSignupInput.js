function validateSignupInput(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ success: false, msg: "All fields are required" });
  }

  next();
}

module.exports = validateSignupInput;
