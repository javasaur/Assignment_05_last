import * as services from '../services';
import {Request, Response} from 'express';

export default class Messages {
    static async getAllDialogueMessages(req: Request, res: Response) {
        services.Messages.getAllDialogueMessages(req.body.dialogueID)
            .then(messages => res.status(200).json(messages))
            .catch((error) => res.status(400).send(error))
    }
}