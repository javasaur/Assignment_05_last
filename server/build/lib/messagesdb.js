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
const db_1 = require("./db");
class MessagesDB {
    constructor() {
    }
    addMessageToDialogue(dialogueID, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.data[dialogueID]) {
                    throw new Error(`Trying to add message to unexisting dialogue ${dialogueID}`);
                }
                // Should be ATOMIC?
                this.data[dialogueID].push(message);
                this.updateStore();
            }
            catch (err) {
                throw new Error(`Failed to add message: ${err}`);
            }
        });
    }
    static getInstance() {
        if (!MessagesDB.instance) {
            MessagesDB.instance = new MessagesDB();
        }
        return MessagesDB.instance;
    }
    getAllDialogueMessages(dialogueID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data[dialogueID] || [];
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.default.readFromStore(db_1.default.MESSAGES_STORE);
                this.data = res;
            }
            catch (err) {
                throw new Error(`MessagesDB initialization failed: ${err.message}`);
            }
        });
    }
    updateStore() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.writeToStore(db_1.default.MESSAGES_STORE, JSON.stringify(this.data));
        });
    }
}
exports.default = MessagesDB;
//# sourceMappingURL=messagesdb.js.map