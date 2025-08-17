const http = require('http');
const app = require('./src/app');
const connectToDB = require('./src/db/db');
const setUpSocketServer = require('./src/socket/socket.server')

const httpServer = http.createServer(app);

setUpSocketServer(httpServer);

connectToDB();

httpServer.listen(3000, () => {
    console.log("server is running on port 3000");
});