import * as services from '../services';
import {Request, Response} from 'express';0

export default class Users {
    static async addUser(req: Request, res: Response) {
        services.Users.addUser(req.body)
            .then(() => res.status(200).send({})) // should return boolean?
            .catch(err => {res.status(400).json({error: err.message})
            });
    }

    static async getAllUsers(req: Request, res: Response) {
        services.Users.getAllUsers()
            .then(users => res.status(200).json(users))
            .catch(err => res.status(400).json({error: err.message}));
    }

    static async getUser(req: Request, res: Response) {
        services.Users.getUserByID(req.params.id)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).send(err.message));
    }

    static async updateUser(req: Request, res: Response) {
        services.Users.updateUser(req.params.id, req.body)
            .then(() => res.status(200).send({}))
            .catch(err => res.status(400).json({error: err.message}));
    }

    static async removeUser(req: Request, res: Response) {
        services.Users.removeUser(req.params.id)
            .then(() => res.status(200).send({}))
            .catch(err => res.status(400).json({error: err.message}));
    }
}