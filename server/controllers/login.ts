import * as services from '../services';
import {Request, Response} from 'express';

export default class Login {
    static async checkMatch(req: Request, res: Response) {
        services.Login.checkMatch(req.body.username, req.body.password)
            .then((accessAllowed) => res.status(200).json(accessAllowed))
            .catch((error) => res.status(400).json({error}))
    }
}