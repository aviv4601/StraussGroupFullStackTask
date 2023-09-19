var bcrypt = require("bcryptjs");

async function hashPassword(req, res, next) {
  const { password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    req.hashedPassword = hash; // attach the hashed password to the request object
    next();
  } catch (err) {
    console.error("Error hashing password: " + err);
    res.json({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = hashPassword;
