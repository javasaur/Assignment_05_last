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
const DAL = require("../lib/dal");
class Messages {
    static addMessageToDialogue(dialogueID, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const privatePattern = /^\d{1,}_\d{1,}$/;
            if (dialogueID.match(privatePattern)) {
                if (!(yield DAL.Talks.existsTalkWithID(dialogueID))) {
                    yield DAL.Talks.addPrivateTalk(dialogueID);
                    yield DAL.UsersTalks.addUsersToPrivateTalk(dialogueID);
                }
                yield DAL.Messages.addMessage(message.content, message.authorId, dialogueID);
                yield DAL.Messages.incrementUnreadMessages(dialogueID);
                return;
            }
            // If user already in a talk -> plain add message
            // No need to create relations
            if (yield DAL.UsersTalks.isUserInTalk(message.authorId, dialogueID)) {
                return DAL.Messages.addMessage(message.content, message.authorId, dialogueID);
            }
            // First add user to talk, then create his message
            yield DAL.UsersTalks.addUserToTalk(message.authorId, dialogueID);
            yield DAL.Messages.addMessage(message.content, message.authorId, dialogueID);
            return;
        });
    }
    static getAllDialogueMessages(talkID) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.Messages.getAllMessagesByTalkID(talkID);
        });
    }
    static nullDialogueMessages(talkID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.Messages.nullUnreadMessages(talkID, userID);
        });
    }
}
exports.default = Messages;
//# sourceMappingURL=messages.js.map