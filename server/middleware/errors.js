require("dotenv").config();
const { ValidationError } = require("express-validation");
const debug = require("debug")("socialNet:errors");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Not found" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ message: "Very bad request" });
  }
  debug("Eeeeerror: ", error.message);
  const message = error.code ? error.message : "General pete";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
