var jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Remove "Bearer " prefix

  if (!token) {
    return res.json({ success: false, msg: "Token not provided" });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.json({ success: false, msg: "Invalid token" });
      }

      req.user = user; // attach the user data to the request for later use
      next(); // move to the next middleware or route handler
    });
  } catch (error) {
    console.error("Error verifying token: " + error);
    res.json({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = verifyToken;
