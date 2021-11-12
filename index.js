require("dotenv").config();
const initiateDB = require("./database");
const initializeServer = require("./server");

const port = process.env.SERVER_PORT;

initializeServer(port);
initiateDB(process.env.MONGO_DB);
