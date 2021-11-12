const chalk = require("chalk");
const mongoose = require("mongoose");
const debug = require("debug")("socialNet:DB");

const initiateDB = (conectingString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(conectingString, (error) => {
      if (error) {
        debug(chalk.red("Not possible to conect DB."));
        debug(chalk.red(error.message));
        reject(error);
      }

      debug(chalk.green("in the funcking DB"));
      resolve();
    });
  });

module.exports = initiateDB;
