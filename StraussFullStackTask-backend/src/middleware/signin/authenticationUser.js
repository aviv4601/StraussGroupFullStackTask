var bcrypt = require("bcryptjs");
var db = require("../../db/database");

async function authenticateUser(req, res, next) {
  const { username, password } = req.body;

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

    if (!row) {
      return res.json({ success: false, msg: "Username not exists" });
    }

    const passwordMatch = await bcrypt.compare(password, row.password);

    if (!passwordMatch) {
      return res.json({ success: false, msg: "Password not match" });
    }

    // Attach the user data to the request for later use in the route handler
    req.user = row;

    next(); // move to the next middleware or route handler
  } catch (err) {
    console.error("Error: " + err);
    res.json({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = authenticateUser;
