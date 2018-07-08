import * as services from '../services';
import {Request, Response} from 'express';

export default class Login {
    static async checkMatch(req: Request, res: Response) {
        services.Login.checkMatch(req.body.username, req.body.password)
            .then(resObj => {res.status(200).json(resObj)})
            .catch(err => res.status(400).send(err.message))
    }
}