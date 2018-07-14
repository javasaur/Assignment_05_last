import * as services from '../services';
import {Request, Response} from 'express';
import Logger from "../lib/logger";

export default class Tree {
    static async buildJSONTree(req: Request, res: Response) {
        services.UsersGroups.buildJSONTree(req.body.userID)
            .then((tree) => res.status(200).json(tree))
            .catch((error) => {
                Logger.log(error);
                res.status(400).send(error.message)
            })
    }

    static async buildAdminJSONTree(req: Request, res: Response) {
        services.UsersGroups.buildAdminJSONTree()
            .then((tree) => res.status(200).json(tree))
            .catch(error => {
                Logger.log(error);
                res.status(400).send(error.message)
            })
    }
}