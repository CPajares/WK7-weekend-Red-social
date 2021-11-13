const express = require("express");
const { getUsers, addFriend } = require("../controller/crancController");
const author = require("../middleware/auth");

const router = express.Router();

router.get("/", author, getUsers);
router.post("/friend", author, addFriend);

module.exports = router;
