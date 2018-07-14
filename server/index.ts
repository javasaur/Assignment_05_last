import * as http from 'http';
import app from './app';
import * as services from "./services/";
import Logger from "./helpers/logger";

const server = http.createServer(app);
const port = 4000;
services.Socket.init(server);

server.listen(port, () => {
    Logger.log(`Server up, listening on port ${port}`);
});