"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
class UsersDB {
    constructor() {
    }
    addUserToGroupRelation(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByID(userID);
            if (!user) {
                throw new Error(`User doesn't exist'`);
            }
            if (!this.usersToDialogues[userID]) {
                this.usersToDialogues[userID] = [];
            }
            this.usersToDialogues[userID].push(groupID);
            this.updateUsersDialoguesStore();
        });
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
                this.updateUsersStore();
            }
            catch (err) {
                throw new Error(`Failed to add user ${user.name}: ${err.message}`);
            }
        });
    }
    addUserToDialogueRelation(userID, dialogueID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userDialogues = this.usersToDialogues[userID];
                if (!userDialogues) {
                    userDialogues = [];
                }
                if (!userDialogues.includes(dialogueID)) {
                    userDialogues.push(dialogueID);
                }
                this.updateUsersDialoguesStore();
            }
            catch (err) {
                throw new Error(`Error adding user-dialogue relation`);
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
    noPasswordUser(user) {
        const { password } = user, noPass = __rest(user, ["password"]);
        return noPass;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.map(this.noPasswordUser);
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
    getPrivateGroupsIDs(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ids = [];
                if (this.usersToDialogues[userID]) {
                    ids = [...this.usersToDialogues[userID].filter(id => id.includes('_'))];
                }
                return ids;
            }
            catch (err) {
                throw new Error(`Failed to fetch private groups ids for ${userID}`);
            }
        });
    }
    getUserByID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.users.find(u => u.id === userId);
                if (!user) {
                    return null;
                }
                return this.noPasswordUser(user);
            }
            catch (err) {
                throw new Error(`Failed to fetch user with id ${userId}: ${err.message}`);
            }
        });
    }
    getUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.users.find(u => u.name.toUpperCase() === name.toUpperCase());
                if (!user) {
                    return null;
                }
                return user;
            }
            catch (err) {
                throw new Error(`Error fetching user ${name} ${err.message}`);
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
    getUserPassword(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.users.find(u => u.name.toUpperCase() === username.toUpperCase());
                if (!user) {
                    throw new Error(`User not found`);
                }
                return user.password;
            }
            catch (err) {
                throw new Error(err.message);
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
                    this.users.splice(index, 1);
                    this.updateUsersStore();
                    return;
                }
                throw new Error(`Trying to delete unexisting user ${userID}`);
            }
            catch (err) {
                throw new Error(`Failed to delete ${userID}: ${err.message}`);
            }
        });
    }
    // async removeUserToDialoguesLinks(userID) {
    //     try {
    //         console.log(`trying to remove ${userID}`);
    //         if(this.usersToDialogues[userID]) {
    //             console.log('before delete', this.usersToDialogues);
    //             delete this.usersToDialogues[userID];
    //             console.log('after delete', this.usersToDialogues);
    //             this.updateUsersDialoguesStore();
    //         }
    //     } catch (err) {
    //         throw new Error(`Failed to delete dialogue references for ${userID}: ${err.message}`);
    //     }
    // }
    updateUser(userID, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let found = yield this.getUserByID(userID);
                if (found) {
                    // seems not good
                    found.name = user.name;
                    if (user.password) {
                        found.password = user.password;
                    }
                    found.age = user.age;
                    this.updateUsersStore();
                    return;
                }
                throw new Error(`Trying to update unexisting user ${userID}`);
            }
            catch (err) {
                throw new Error(`Failed to update ${user.name}: ${err.message}`);
            }
        });
    }
    updateUsersStore() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.writeToStore(db_1.default.USERS_STORE, JSON.stringify({ users: this.users }));
        });
    }
    updateUsersDialoguesStore() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.writeToStore(db_1.default.USERS_TO_DIALOGUES_STORE, JSON.stringify(this.usersToDialogues));
        });
    }
}
exports.default = UsersDB;
//# sourceMappingURL=usersdb.js.map