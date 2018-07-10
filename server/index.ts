import * as http from 'http';
import app from './app';
import * as services from "./services/";

const server = http.createServer(app);
const port = 4000;
services.Socket.init(server);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});