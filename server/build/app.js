"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middlewares = require("./middlewares");
const routes = require("./routes");
const app = express();
app.use(middlewares.defaultMiddlewares);
app.use('/users', routes.userRouters);
app.use('/login', routes.loginRouters);
app.use('/tree', routes.treeRouters);
app.use('/messages', routes.messagesRouters);
app.use('/groups', routes.groupsRouters);
exports.default = app;
//# sourceMappingURL=app.js.map