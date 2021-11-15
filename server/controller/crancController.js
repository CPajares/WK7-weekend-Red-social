const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  const { name } = req.userData;
  try {
    const users = await User.find({ name: { $ne: name } });
    res.json(users);
  } catch {
    const error = new Error("Not found!");
    error.code = 401;
    next(error);
  }
};

const addFriend = async (req, res, next) => {
  try {
    const { id } = req.body;
    const friend = await User.findOne({ _id: id });

    const user = await User.findOne({ username: req.userData.surname });

    // eslint-disable-next-line no-underscore-dangle
    user.friends = [...user.friends, friend._id];

    await user.save(user);
    res.json(user);
  } catch {
    const error = new Error("Friend not found");
    error.code = 401;
    next(error);
  }
};

const getFriends = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.userData }).populate({
      path: "friends",
    });
    res.json(user);
  } catch {
    const error = new Error("Error while looking for friends");
    error.code = 401;
    next(error);
  }
};

module.exports = { getUsers, addFriend, getFriends };
