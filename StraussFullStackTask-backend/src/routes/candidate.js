var express = require("express");
var verifyToken = require("../middleware/getCandidates/verifyToken");
var getCandidates = require("../middleware/getCandidates/getCandidates");
const router = express.Router();

router.get("/", verifyToken, getCandidates, (req, res) => {
  try {
    const candidates = req.candidates || []; // ensure candidates is an array, default to an empty array

    if (candidates.length > 0) {
      // send a success response with the candidates
      res.json({ success: true, candidates: candidates });
    } else {
      // send a failure response if no candidates are found
      res.json({ success: false, msg: "No candidates found" });
    }
  } catch (error) {
    console.error("Error handling candidates request: " + error);
    res.json({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
