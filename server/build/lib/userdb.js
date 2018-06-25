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
class UserDB {
    constructor() {
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('before trying');
                const filtered = this.data.filter(u => u.name.toUpperCase() === user.name.toUpperCase());
                if (filtered.length > 0) {
                    throw new Error(`Username is busy`);
                }
                // temp, add uuid or other id gen stuff
                const id = this.data.length + Date.now() + '';
                const u = Object.assign({}, user, { id: id });
                // SHOULD BE UPDATED ATOMIC?!
                this.data.push(u);
                this.updateStore();
            }
            catch (err) {
                throw new Error(`Failed to add user ${user.name}: ${err.message}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data;
        });
    }
    static getInstance() {
        if (!UserDB.instance) {
            UserDB.instance = new UserDB();
        }
        return UserDB.instance;
    }
    getUserByID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.data.find(u => u.id === userId) || null;
            }
            catch (err) {
                throw new Error(`Failed to fetch user with id ${userId}: ${err.message}`);
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.default.readFromStore(db_1.default.USERS_STORE);
                this.data = res['users'];
            }
            catch (err) {
                throw new Error(`UserDB initialization failed: ${err.message}`);
            }
        });
    }
    removeUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let index = -1;
                const found = this.data.find((u, i) => {
                    index = i;
                    return u.id === userID;
                });
                if (found) {
                    // SHOULD BE UPDATED ATOMIC?!
                    this.data.splice(index, 1);
                    this.updateStore();
                }
                throw new Error(`Trying to delete unexisting user ${userID}`);
            }
            catch (err) {
                throw new Error(`Failed to delete ${userID}: ${err.message}`);
            }
        });
    }
    updateUser(userID, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let found = yield this.getUserByID(userID);
                if (found) {
                    // seems not good
                    found.name = user.name;
                    found.password = user.password;
                    found.age = user.age;
                    return;
                }
                throw new Error(`Trying to update unexisting user ${userID}`);
            }
            catch (err) {
                throw new Error(`Failed to update ${user.name}: ${err.message}`);
            }
        });
    }
    updateStore() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.writeToStore(db_1.default.USERS_STORE, JSON.stringify({ users: this.data }));
        });
    }
}
exports.default = UserDB;
//# sourceMappingURL=userdb.js.map