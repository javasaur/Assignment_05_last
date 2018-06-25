"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dbmanager_1 = require("../lib/dbmanager");
const db = dbmanager_1.default.getInstance();
const app = express();
app.use(function (req, res, next) {
    db.isReady() ? next() : res.status(400).send('DB IS NOT AVAILABLE, RETRY LATER!');
});
exports.default = app;
//# sourceMappingURL=dbstatus.js.map