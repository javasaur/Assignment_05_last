import * as http from 'http';
import app from './app';
import DBManager from "./lib/dbmanager";
import * as sio from "socket.io";

const db = DBManager.getInstance();
const server = http.createServer(app);
const port = 4000;
const io = sio(server);

io.on('connection', socket => {
    console.log('someone connected');
})

setTimeout(() => {
    db.initStores();
}, 2000)

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});