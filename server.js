const express = require("express");
const cors = require("cors"); // Import the cors middleware
const bodyParser = require("body-parser");

const candidateRouter = require("./src/routes/candidate");
const signUpRouter = require("./src/routes/auth/signup");
const signInRouter = require("./src/routes/auth/signin");

const app = express();

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(cors());
app.use(bodyParser.json());

// GET /api/candidate
app.use("/api/candidate", candidateRouter);

// POST /api/auth/signin
app.use("/api/auth/signup", signUpRouter);

// POST /api/auth/signin
app.use("/api/auth/signin", signInRouter);
