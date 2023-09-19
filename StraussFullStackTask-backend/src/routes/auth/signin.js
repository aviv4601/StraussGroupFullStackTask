var bcrypt = require("bcryptjs");
var db = require("../../db/database");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

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

    if (!row) {
      res.json({ success: false, msg: "Username not exists" });
      return;
    }

    console.log("row: " + row);
    console.log("user input: " + password);
    console.log("db: " + row.password);

    const passwordMatch = await bcrypt.compare(password, row.password);

    if (passwordMatch) {
      const token = jwt.sign(row, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, msg: "Password not match" });
    }
  } catch (err) {
    console.error("Error: " + err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
