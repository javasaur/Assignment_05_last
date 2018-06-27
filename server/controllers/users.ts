import * as services from '../services';
import {Request, Response} from 'express';
import Socket from "../services/socket";

export default class Users {
    static async addUser(req: Request, res: Response) {
        services.Users.addUser(req.body)
            .then(() => {
                Socket.notifyOnTreeChange();
                res.status(200).send({})
            }) // should return boolean?
            .catch(err => {
                console.log(err);
                res.status(400).send(err.message);
            });
    }

    static async getAllUsers(req: Request, res: Response) {
        services.Users.getAllUsers()
            .then(users => res.status(200).json(users))
            .catch(err => res.status(400).send(err.message));
    }

    static async getUser(req: Request, res: Response) {
        services.Users.getUserByID(req.params.id)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).send(err.message));
    }

    static async updateUser(req: Request, res: Response) {
        services.Users.updateUser(req.query.id, req.body)
            .then(() => res.status(200).send({}))
            .catch(err => res.status(400).send(err.message));
    }

    static async removeUser(req: Request, res: Response) {
        services.UsersGroups.removeUser(req.query.id)
            .then(() => res.status(200).send({}))
            .catch(err => res.status(400).send(err.message));
    }
}