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
const usersdb_1 = require("./usersdb");
const sessionsdb_1 = require("./sessionsdb");
const helpers_1 = require("../util/helpers");
const messagesdb_1 = require("./messagesdb");
const groupsdb_1 = require("./groupsdb");
class DBManager {
    constructor() {
        this.storesReady = false;
        this.usersDB = usersdb_1.default.getInstance();
        this.groupsDB = groupsdb_1.default.getInstance();
        this.sessionsDB = sessionsdb_1.default.getInstance();
        this.messagesDB = messagesdb_1.default.getInstance();
    }
    static getInstance() {
        if (!DBManager.instance) {
            DBManager.instance = new DBManager();
        }
        return DBManager.instance;
    }
    initStores() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                this.usersDB.init(),
                this.sessionsDB.init(),
                this.messagesDB.init(),
                this.groupsDB.init()
            ])
                .then(() => {
                console.log('All stores are initialised!');
                this.storesReady = true;
            })
                .catch(helpers_1.rethrow);
        });
    }
    isReady() {
        return this.storesReady;
    }
}
exports.default = DBManager;
//# sourceMappingURL=dbmanager.js.map