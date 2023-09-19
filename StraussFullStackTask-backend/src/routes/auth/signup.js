var express = require("express");
var router = express.Router();
var validateSignupInput = require("../../middleware/singup/validateSignupInput");
var checkUsernameAvailability = require("../../middleware/singup/checkUsernameAvailability");
var hashPassword = require("../../middleware/singup/hashPassword");
var insertDataToDB = require("../../middleware/singup/insertDataToDB");
const jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

router.post(
  "/",
  validateSignupInput,
  checkUsernameAvailability,
  hashPassword,
  insertDataToDB,
  async (req, res) => {
    try {
      const userData = req.userData; // data passed from previous middleware
      const token = jwt.sign(userData, JWT_SECRET, {
        expiresIn: "1h",
      });

      // send a success response
      res.json({ success: true, token: token });
    } catch (err) {
      console.error("Error: " + err);
      res.json({ success: false, msg: "Internal Server Error" });
    }
  }
);

module.exports = router;
