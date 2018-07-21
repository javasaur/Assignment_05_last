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
const services = require("../services");
const db_1 = require("../helpers/db");
const common_1 = require("../helpers/common");
class Messages {
    static addMessageToDialogue(dialogueID, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Private talks
                const privatePattern = /^\d{1,}_\d{1,}$/;
                if (dialogueID.match(privatePattern)) {
                    let t = db_1.transaction();
                    let treeChanged = false;
                    // Update the tree in case new private talk was created
                    if (!(yield DAL.Talks.existsTalkWithID(dialogueID))) {
                        t.append(DAL.Talks.addPrivateTalk(dialogueID).query);
                        t.append(DAL.UsersTalks.addUsersToPrivateTalk(dialogueID).query);
                        treeChanged = true;
                    }
                    t.append(DAL.Messages.addMessage(message.content, message.authorId, dialogueID).query);
                    t.append(DAL.Messages.incrementUnreadMessages(dialogueID).query);
                    yield t.buildAndExecute();
                    if (treeChanged) {
                        services.Socket.notifyOnTreeChange();
                    }
                    return;
                }
                // Public talks (groups)
                // If user already in a talk -> plain add message
                // No need to create relations
                if (yield DAL.UsersTalks.isUserInTalk(message.authorId, dialogueID)) {
                    yield db_1.execAsTransaction(DAL.Messages.addMessage(message.content, message.authorId, dialogueID).query, DAL.Messages.incrementUnreadMessages(dialogueID).query);
                    return;
                }
                // First add user to talk, then create his message
                yield db_1.execAsTransaction(DAL.UsersTalks.addUserToTalk(message.authorId, dialogueID).query, DAL.Messages.addMessage(message.content, message.authorId, dialogueID).query, DAL.Messages.addUnreadMessagesCounter(dialogueID, message.authorId).query, DAL.Messages.incrementUnreadMessages(dialogueID).query);
                services.Socket.notifyOnTreeChange();
                return;
            }
            catch (err) {
                common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
    static getAllDialogueMessages(talkID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DAL.Messages.getAllMessagesByTalkID(talkID).execute();
            }
            catch (err) {
                common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
    static nullDialogueMessages(talkID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return DAL.Messages.nullUnreadMessages(talkID, userID).execute();
            }
            catch (err) {
                common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
}
exports.default = Messages;
//# sourceMappingURL=messages.js.map