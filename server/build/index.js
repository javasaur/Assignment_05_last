"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const dbmanager_1 = require("./lib/dbmanager");
const services = require("./services/");
const db = dbmanager_1.default.getInstance();
const server = http.createServer(app_1.default);
const port = 4000;
services.Socket.init(server);
db.initStores();
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map