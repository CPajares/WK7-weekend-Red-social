const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

require("dotenv").config();

const registerUser = async (req, res, next) => {
  const { name, username, password, age, image } = req.body;
  try {
    const user = await User.create({
      name,
      username,
      password: bcrypt.hashSync(password, 10),
      age,
      image,
    });
    res.json(user);
  } catch (error) {
    error.code = 400;
    error.message = "Not valid inputs";
    next(error);
  }
};

module.exports = registerUser;
