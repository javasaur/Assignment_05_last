"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const services = require("./services/");
const server = http.createServer(app_1.default);
const port = 4000;
services.Socket.init(server);
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map