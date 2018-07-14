import * as services from "../services";
import {Request, Response} from "express";
import UsersGroups from "../services/usersgroups";

export default class Groups {
    static async addGroup(req: Request, res: Response) {
        if(req.body.parent === 'root') {
            services.Groups.addRootGroup(req.body.name)
                .then(() => {
                    services.Socket.notifyOnTreeChange();
                    services.Socket.notifyOnAdminTreeChange();
                    res.status(200).send({})
                })
                .catch(err => res.status(400).send(err.message));
        } else {
            services.Groups.addGroupUnderParent(req.body.name, req.body.parent)
                .then(() => {
                    services.Socket.notifyOnTreeChange();
                    services.Socket.notifyOnAdminTreeChange();
                    res.status(200).send({})
                })
                .catch(err => res.status(400).send(err.message));
        }
    }

    static async addUserToGroup(req: Request, res: Response) {
        UsersGroups.addUserToGroup(req.body.userID, req.body.groupID)
            .then(() => {
                services.Socket.notifyOnTreeChange();
                res.status(200).send({});
            })
            .catch(err => res.status(400).send(err.message));
    }

    static async removeGroup(req: Request, res: Response) {
        UsersGroups.removeGroup(req.params.id)
            .then(() => {
                services.Socket.notifyOnTreeChange();
                services.Socket.notifyOnAdminTreeChange();
                res.status(200).send({})
            })
            .catch(err => res.status(400).send(err.message));
    }
}