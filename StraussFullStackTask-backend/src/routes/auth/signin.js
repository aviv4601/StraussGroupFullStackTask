var express = require("express");
var validateSigninInput = require("../../middleware/signin/validateSigninInput");
var authenticateUser = require("../../middleware/signin/authenticationUser");
var router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

router.post("/", validateSigninInput, authenticateUser, (req, res) => {
  // authentication is successful, and user data is attached to req.user by middlewares
  const token = jwt.sign(req.user, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ success: true, token: token });
});

module.exports = router;
