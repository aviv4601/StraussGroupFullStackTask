var db = require("../../db/database.js");

async function checkUsernameAvailability(req, res, next) {
  const { username } = req.body;

  try {
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
      return res.json({ success: false, msg: "Username already taken" });
    }

    next();
  } catch (err) {
    console.error("Error checking username availability: " + err);
    res.json({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = checkUsernameAvailability;
