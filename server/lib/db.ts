import {CONFIG} from '../config';
const db = require('mysql');

let conn;

function initConnection() {
    conn = db.createConnection({
        host: CONFIG.DATABASE.host,
        user: CONFIG.DATABASE.user,
        password: CONFIG.DATABASE.password,
        database: CONFIG.DATABASE.database,
        multipleStatements: true
    });

    conn.connect();
}

export const connection = () => {
    if(!conn){
        initConnection();
    }

    return conn;
}