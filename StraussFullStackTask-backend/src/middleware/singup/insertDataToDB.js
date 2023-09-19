var db = require("../../db/database");

async function insertDataToDB(req, res, next) {
  try {
    const { username, email } = req.body; // Data passed from previous middleware
    const hashedPassword = req.hashedPassword; // Data passed from previous middleware
    const userData = {
      username: username,
      email: email,
      password: hashedPassword,
    };

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

    req.userData = userData; // attach the user data to the request object
    next();
  } catch (err) {
    console.error("Error inserting data into the database: " + err);
    res.json({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = insertDataToDB;
