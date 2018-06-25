import * as express from 'express';
import DBManager from "../lib/dbmanager";

const db = DBManager.getInstance();
const app = express();
app.use(function (req, res, next) {
    db.isReady() ?  next() : res.status(400).send('DB IS NOT AVAILABLE, RETRY LATER!');
})

export default app;

