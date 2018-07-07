import * as services from "../services";
import {Request, Response} from "express";
import Socket from "../services/socket";
import UsersGroups from "../services/usersgroups";

export default class Groups {
    static async addGroup(req: Request, res: Response) {
        if(req.body.parent === 'root') {
            services.Groups.addRootGroup(req.body.name)
                .then(() => {
                    Socket.notifyOnAdminTreeChange();
                    res.status(200).send({})
                })
                .catch(err => {
                    res.status(400).send(err.message);
                });
        } else {
            services.Groups.addGroupUnderParent(req.body.name, req.body.parent)
                .then(() => {
                    Socket.notifyOnAdminTreeChange();
                    res.status(200).send({})
                })
                .catch(err => {
                    res.status(400).send(err.message);
                });
        }
    }

    static async addUserToGroup(req: Request, res: Response) {
        UsersGroups.addUserToGroup(req.body.userID, req.body.groupID)
            .then(() => {
                res.status(200).send({});
            })
            .catch(err => {
                res.status(400).send(err.message);
            });
    }
}