const express = require("express");
const {
  registerUser,
  loginRegister,
} = require("../controller/usersController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", auth, registerUser);

router.post("/login", loginRegister);

module.exports = router;
