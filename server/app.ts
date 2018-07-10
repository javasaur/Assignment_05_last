import * as express from 'express';
import * as middlewares from './middlewares';
import * as routes from './routes';

const app = express();

app.use(middlewares.defaultMiddlewares);
app.use('/users', routes.userRouters);
app.use('/login', routes.loginRouters);
app.use('/tree', routes.treeRouters);
app.use('/messages', routes.messagesRouters);
app.use('/groups', routes.groupsRouters);

export default app;