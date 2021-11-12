const express = require("express");

const router = express.Router();

router.post("/register", (req, res, next) => {
  res.json("REGISTER");
});

router.post("/login", (req, res, next) => {
  res.json("LOGIN");
});

module.exports = router;
