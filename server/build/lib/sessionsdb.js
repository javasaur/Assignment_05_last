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
const helpers_1 = require("../util/helpers");
class SessionsDB {
    constructor() {
    }
    openSession() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = helpers_1.genID();
                // Should be ATOMIC?
                this.data.push(id);
                this.updateStore();
            }
            catch (err) {
                throw new Error(`Failed opening session: ${err}`);
            }
        });
    }
    closeAllSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data.length = 0;
            this.updateStore();
        });
    }
    getAllSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data;
        });
    }
    static getInstance() {
        if (!SessionsDB.instance) {
            SessionsDB.instance = new SessionsDB();
        }
        return SessionsDB.instance;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.default.readFromStore(db_1.default.SESSIONS_STORE);
                this.data = res['sessions'];
            }
            catch (err) {
                throw new Error(`SessionsDB initialization failed: ${err.message}`);
            }
        });
    }
    updateStore() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.writeToStore(db_1.default.SESSIONS_STORE, JSON.stringify({ sessions: this.data }));
        });
    }
}
exports.default = SessionsDB;
//# sourceMappingURL=sessionsdb.js.map