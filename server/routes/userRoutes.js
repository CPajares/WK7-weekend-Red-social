const express = require("express");
const { validate } = require("express-validation");
const {
  registerUser,
  loginRegister,
} = require("../controller/usersController");
const auth = require("../middleware/auth");
const { loginRequestSchema } = require("../schemas/userSchemas");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", validate(loginRequestSchema), loginRegister);

module.exports = router;
