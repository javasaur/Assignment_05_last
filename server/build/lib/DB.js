"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const db = require('mysql');
let conn;
function initConnection() {
    conn = db.createConnection({
        host: config_1.CONFIG.DATABASE.host,
        user: config_1.CONFIG.DATABASE.user,
        password: config_1.CONFIG.DATABASE.password,
        database: config_1.CONFIG.DATABASE.database,
        multipleStatements: true
    });
    conn.connect();
}
exports.connection = () => {
    if (!conn) {
        initConnection();
    }
    return conn;
};
//# sourceMappingURL=db.js.map