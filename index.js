require("dotenv").config();
const initiateDB = require("./database");
const initializeServer = require("./server");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 6666;

initializeServer(port);
initiateDB(process.env.MONGO_DB);
