var bcrypt = require("bcryptjs");
var db = require("../../db/database");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("username: , password: ,email" + username, password, email);

    // checking if the username is already taken
    const query = "SELECT * FROM user WHERE username = ?";

    const row = await new Promise((resolve, reject) => {
      db.get(query, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (row) {
      // username already taken
      res.json({ success: false, msg: "Username already taken" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // creating the user object with the hashed password
      const userData = {
        username: username,
        email: email,
        password: hash,
      };

      const token = jwt.sign(userData, JWT_SECRET, {
        expiresIn: "1h",
      });

      const insertQuery = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;

      await new Promise((resolve, reject) => {
        db.run(
          insertQuery,
          [userData.username, userData.email, userData.password],
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });

      // send a success response
      res.json({ success: true, token: token });
    }
  } catch (err) {
    console.error("Error: " + err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
