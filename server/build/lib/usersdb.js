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
class UsersDB {
    constructor() {
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filtered = this.users.filter(u => u.name.toUpperCase() === user.name.toUpperCase());
                if (filtered.length > 0) {
                    throw new Error(`Username is busy`);
                }
                // temp, add uuid or other id gen stuff
                const id = this.users.length + Date.now() + '';
                const u = Object.assign({}, user, { id: id });
                // SHOULD BE UPDATED ATOMIC?!
                this.users.push(u);
                this.updateStore();
            }
            catch (err) {
                throw new Error(`Failed to add user ${user.name}: ${err.message}`);
            }
        });
    }
    checkMatch(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let foundMatch = false, id = null;
                const found = this.users.find(u => {
                    return u.name.toUpperCase() === username.toUpperCase() && u.password === password;
                });
                if (found) {
                    foundMatch = true;
                    id = found.id;
                }
                return { foundMatch, id };
            }
            catch (err) {
                throw new Error(`Failed to check credentials for ${username}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    getAssociatedGroupsIDs(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersToDialogues[userID] || [];
        });
    }
    static getInstance() {
        if (!UsersDB.instance) {
            UsersDB.instance = new UsersDB();
        }
        return UsersDB.instance;
    }
    getUserByID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.users.find(u => u.id === userId) || null;
            }
            catch (err) {
                throw new Error(`Failed to fetch user with id ${userId}: ${err.message}`);
            }
        });
    }
    getUsersByIds(usersIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = [];
                for (let id of usersIDs) {
                    const user = yield this.getUserByID(id);
                    users.push(Object.assign({}, user));
                }
                return users;
            }
            catch (err) {
                throw new Error(`Failed to fetch users: ${err.message} `);
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield db_1.default.readFromStore(db_1.default.USERS_STORE);
                this.users = res['users'];
                res = yield db_1.default.readFromStore(db_1.default.USERS_TO_DIALOGUES_STORE);
                this.usersToDialogues = res;
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
                const found = this.users.find((u, i) => {
                    index = i;
                    return u.id === userID;
                });
                if (found) {
                    // SHOULD BE UPDATED ATOMIC?!
                    this.users.splice(index, 1);
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
            db_1.default.writeToStore(db_1.default.USERS_STORE, JSON.stringify({ users: this.users }));
        });
    }
}
exports.default = UsersDB;
//# sourceMappingURL=usersdb.js.map