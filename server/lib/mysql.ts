const db = require('mysql');

let conn;

function initConnection() {
    conn = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        database: 'chat',
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