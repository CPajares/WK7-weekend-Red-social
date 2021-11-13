const jwt = require("jsonwebtoken");
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

const loginRegister = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Incorrect details!");
    error.code = 401;
    next(error);
  } else {
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      const error = new Error("Incorrect details!!");
      error.code = 401;
      next(error);
    } else {
      const token = await jwt.sign(
        {
          id: user.id,
          name: user.name,
          surname: user.username,
          age: user.age,
          friends: user.friends,
          enemies: user.enemies,
        },
        process.env.JWT_SECRET
      );
      res.json({ token });
    }
  }
};

module.exports = { registerUser, loginRegister };
