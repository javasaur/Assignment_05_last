"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function rethrow(err) {
    throw err;
}
exports.rethrow = rethrow;
function genID() {
    return uuid_1.v1();
}
exports.genID = genID;
function sendError(error, ...args) {
    const res = args[0];
    const status = args[1];
    res.status(status).send(error);
}
exports.sendError = sendError;
//# sourceMappingURL=helpers.js.map