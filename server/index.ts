import * as http from 'http';
import app from './app';
import DBManager from "./lib/dbmanager";

const db = DBManager.getInstance();
const server = http.createServer(app);
const port = 4000;

setTimeout(() => {
    db.initStores();
}, 2000)

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});