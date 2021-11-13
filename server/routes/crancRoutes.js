const express = require("express");
const {
  getUsers,
  addFriend,
  getFriends,
} = require("../controller/crancController");
const author = require("../middleware/auth");

const router = express.Router();

router.get("/", author, getUsers);
router.post("/friend", author, addFriend);
router.get("/friend", author, getFriends);

module.exports = router;
