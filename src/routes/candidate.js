var express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;
const db = require("../db/database");
const router = express.Router();

router.get("/", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1]; // Remove "Bearer " prefix
  console.log("the token is:", token);

  if (!token) {
    return res.status(401).json({ success: false, msg: "Token not provided" });
  }

  const tokenData = jwt.decode(token);
  console.log("Decoded Token:", tokenData);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(token);
    if (err) {
      return res.status(403).json({ success: false, msg: "Invalid token" });
    }

    // SQLite query to retrieve candidates from the database
    const query = "SELECT * FROM candidate";

    db.all(query, (err, rows) => {
      if (err) {
        console.error("Error executing query: " + err);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
        return;
      }

      // check if there are candidates in the result
      if (rows.length > 0) {
        // send a success response with the candidates
        res.json({ success: true, candidates: rows });
      } else {
        // send a failure response if no candidates are found
        res.json({ success: false, msg: "No candidates found" });
      }
    });
  });
});

module.exports = router;
