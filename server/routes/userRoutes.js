const express = require("express");
const registerUser = require("../controller/usersController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", (req, res) => {
  res.json("LOGIN");
});

module.exports = router;
