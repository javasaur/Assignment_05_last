import * as services from '../services';
import {Request, Response} from 'express';

export default class Messages {
    static async addMessage(req: Request, res: Response) {
        services.Messages.addMessageToDialogue(req.body.dialogueID, req.body.message)
            .then(() => {
                services.Socket.notifyByMessagesUpdate(req.body.dialogueID);
                res.status(200).send({});
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })
    }

    static async getAllDialogueMessages(req: Request, res: Response) {
        services.Messages.getAllDialogueMessages(req.body.dialogueID)
            .then(messages => res.status(200).json(messages))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })
    }
}