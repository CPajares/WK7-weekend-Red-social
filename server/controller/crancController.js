const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch {
    const error = new Error("Not found!");
    error.code = 401;
    next(error);
  }
};

module.exports = getUsers;
