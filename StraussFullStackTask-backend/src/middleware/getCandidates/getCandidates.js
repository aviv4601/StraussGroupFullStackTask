var db = require("../../db/database");

function getCandidates(req, res, next) {
  // SQLite query to retrieve candidates from the database
  const query = "SELECT * FROM candidate";

  try {
    db.all(query, (err, rows) => {
      if (err) {
        console.error("Error executing query: " + err);
        res.json({ success: false, msg: "Internal Server Error" });
        return;
      }

      // check if there are candidates in the result
      if (rows.length > 0) {
        req.candidates = rows; // Attach the candidates data to the request for later use
      }

      next(); // Move to the next middleware or route handler
    });
  } catch (error) {
    console.error("Error handling candidates request: " + error);
    res.json({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = getCandidates;
