require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const debug = require("debug")("socialNet:server");
const userRoutes = require("./routes/userRoutes");
const {
  notFoundErrorHandler,
  generalErrorHandler,
} = require("./middleware/errors");

const app = express();
const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server on, lisen at ${port}`));
      resolve(server);
    });
    server.on("error", () => {
      debug(chalk.red("Error tring to conect the server"));
      reject();
    });
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

module.exports = initializeServer;

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);
