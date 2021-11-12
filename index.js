const initializeServer = require("./server");

const port = process.env.SERVER_PORT;

initializeServer(port);
