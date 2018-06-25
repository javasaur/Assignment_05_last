"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const dbmanager_1 = require("./lib/dbmanager");
const sio = require("socket.io");
const db = dbmanager_1.default.getInstance();
const server = http.createServer(app_1.default);
const port = 4000;
const io = sio(server);
io.on('connection', socket => {
    console.log('someone connected');
});
setTimeout(() => {
    db.initStores();
}, 2000);
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map