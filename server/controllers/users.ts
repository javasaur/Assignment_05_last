import * as services from '../services';
import {Request, Response} from 'express';
import Socket from "../services/socket";

export default class Users {
    static async addUser(req: Request, res: Response) {
        services.Users.addUser(req.body)
            .then(() => {
                Socket.notifyOnTreeChange();
                Socket.notifyOnUsersChange();
                res.status(200).send({})
            })
            .catch(err => res.status(400).send(err.message));
    }

    static async getAllUsers(req: Request, res: Response) {
        if(req.query.group) {
            services.UsersGroups.getUsersByGroupID(req.query.group)
                .then(users => res.status(200).json(users))
                .catch(err => res.status(400).send(err.message));
        } else {
            services.Users.getAllUsers()
                .then(users => res.status(200).json(users))
                .catch(err => res.status(400).send(err.message));
        }
    }

    static async getUser(req: Request, res: Response) {
        services.Users.getUserByID(req.params.id)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).send(err.message));
    }

    static async removeUser(req: Request, res: Response) {
        if(req.query.group) {
            services.Socket.notifyOnTreeChange();
            services.UsersGroups.removeUserFromGroup(req.query.id, req.query.group)
                .then(() => {
                    Socket.notifyOnUsersChange();
                    res.status(200).send({})
                })
                .catch(err => res.status(400).send(err.message));
        } else {
            services.Socket.notifyOnTreeChange();
            services.UsersGroups.removeUser(req.query.id)
                .then(() => res.status(200).send({}))
                .catch(err => res.status(400).send(err.message));
        }
    }

    static async updateUser(req: Request, res: Response) {
        services.Users.updateUser(req.query.id, req.body)
            .then(() => {
                Socket.notifyOnUsersChange();
                res.status(200).send({})
            })
            .catch(err => res.status(400).send(err.message));
    }
}