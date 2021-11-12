const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  res.json("REGISTER");
});

router.post("/login", (req, res) => {
  res.json("LOGIN");
});

module.exports = router;
