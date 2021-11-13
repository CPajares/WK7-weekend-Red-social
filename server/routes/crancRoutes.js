const express = require("express");
const getUsers = require("../controller/crancController");
const author = require("../middleware/auth");

const router = express.Router();

router.get("/", author, getUsers);

module.exports = router;
