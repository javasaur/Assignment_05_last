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
const messagesdb_1 = require("../lib/messagesdb");
const services = require("../services/");
const usersdb_1 = require("../lib/usersdb");
const groupsdb_1 = require("../lib/groupsdb");
class Messages {
    static addMessageToDialogue(dialogueID, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isPrivate = false;
                const dialogue = yield groupsdb_1.default.getInstance().getGroupByID(dialogueID);
                if (!dialogue) {
                    const regex = new RegExp(/\w+_\w+/);
                    if (!regex.test(dialogueID)) {
                        throw new Error(`Unknow dialogue format ${dialogueID}`);
                    }
                    isPrivate = true;
                    yield groupsdb_1.default.getInstance().addPrivateGroup(dialogueID);
                    yield messagesdb_1.default.getInstance().createMessageChunk(dialogueID);
                }
                yield messagesdb_1.default.getInstance().addMessageToDialogue(dialogueID, message);
                if (isPrivate) {
                    const secondCompanion = yield groupsdb_1.default.getInstance().getSecondCompanionID(dialogueID, message.authorId);
                    console.log(`second companio is: ${secondCompanion}`);
                    yield usersdb_1.default.getInstance().addUserToDialogueRelation(secondCompanion, dialogueID);
                }
                yield usersdb_1.default.getInstance().addUserToDialogueRelation(message.authorId, dialogueID);
                yield groupsdb_1.default.getInstance().addUserIfMissing(message.authorId, dialogueID);
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getAllDialogueMessages(dialogueID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messages = yield messagesdb_1.default.getInstance().getAllDialogueMessages(dialogueID);
                messages = messages.map((msg) => __awaiter(this, void 0, void 0, function* () {
                    const author = yield services.Users.getUserByID(msg.authorId);
                    const name = author ? author.name : 'UNEXISTING_USER';
                    return Object.assign({}, msg, { authorName: name });
                }));
                return Promise.all(messages);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = Messages;
//# sourceMappingURL=messages.js.map