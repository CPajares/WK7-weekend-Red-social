const express = require("express");
const {
  registerUser,
  loginRegister,
} = require("../controller/usersController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginRegister);

module.exports = router;
