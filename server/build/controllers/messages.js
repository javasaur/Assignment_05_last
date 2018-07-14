"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services = require("../services");
class Messages {
    static addMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.Messages.addMessageToDialogue(req.body.dialogueID, req.body.message)
                .then(() => {
                services.Socket.notifyByMessagesUpdate(req.body.dialogueID);
                res.status(200).send({});
            })
                .catch((error) => res.status(400).send(error));
        });
    }
    static getAllDialogueMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.Messages.getAllDialogueMessages(req.body.dialogueID)
                .then(messages => res.status(200).json(messages))
                .catch(error => res.status(400).send(error));
        });
    }
}
exports.default = Messages;
//# sourceMappingURL=messages.js.map