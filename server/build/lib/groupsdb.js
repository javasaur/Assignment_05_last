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
class GroupsDB {
    constructor() {
    }
    addUser(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.getGroupByID(groupID);
            if (group) {
                if (group.users.includes(userID)) {
                    throw new Error(`User already in group`);
                }
                group.users.push(userID);
                this.updateStore();
            }
        });
    }
    addGroupUnderParent(name, parentID) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = yield this.getGroupByID(parentID);
            if (parent.users.length > 0) {
                throw new Error('Group contains users, subgroup not allowed');
            }
            const siblings = yield this.getGroupsByIDs(parent.groups);
            for (let sibling of siblings) {
                if (sibling.name.toUpperCase() === name.toUpperCase()) {
                    throw new Error('One of the future siblings has the same groupname');
                }
            }
            const newGroup = {
                type: 'group',
                name,
                id: this.data.length + Date.now() + '',
                'parentID': parentID,
                groups: [],
                users: [],
                items: []
            };
            parent.groups.push(newGroup.id);
            this.data.push(newGroup);
            this.updateStore();
        });
    }
    addRootGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootGroups = yield this.getPublicGroups('root');
            const found = rootGroups.find(u => u.name.toUpperCase() === name.toUpperCase());
            if (found) {
                throw new Error(`Name is busy`);
            }
            this.data.push({
                type: 'group',
                name,
                id: this.data.length + Date.now() + '',
                'parentID': null,
                groups: [],
                users: [],
                items: []
            });
            this.updateStore();
        });
    }
    addPrivateGroup(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = {
                "type": "group",
                "name": "PM",
                "id": groupID,
                "parentID": null,
                "groups": [],
                "users": []
            };
            this.data.push(group);
            this.updateStore();
        });
    }
    addUserIfMissing(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.getGroupByID(groupID);
            if (!group['users'].includes(userID)) {
                group['users'].push(userID);
                this.updateStore();
            }
        });
    }
    getGroupByID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data.find(u => u.id === groupID) || null;
        });
    }
    getGroupsByIDs(groupsIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = [];
                for (let id of groupsIDs) {
                    const group = yield this.getGroupByID(id);
                    groups.push(Object.assign({}, group));
                }
                return groups;
            }
            catch (err) {
                throw new Error(`Failed to fetch groups: ${err.message} `);
            }
        });
    }
    getSecondCompanionID(groupID, firstCompanionID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companions = groupID.split('_').filter(id => id !== firstCompanionID);
                if (companions.length > 1) {
                    throw new Error('Filtering for getSecondCompanion not worked');
                }
                return companions[0];
            }
            catch (err) {
                throw new Error(`Failed to fetch second user from group id ${groupID}`);
            }
        });
    }
    getAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data || [];
        });
    }
    static getInstance() {
        if (!GroupsDB.instance) {
            GroupsDB.instance = new GroupsDB();
        }
        return GroupsDB.instance;
    }
    getPublicGroups(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filter === 'root') {
                return [...this.data].filter(g => !g.id.includes('_') && g.parentID === null);
            }
            return [...this.data].filter(g => !g.id.includes('_'));
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.default.readFromStore(db_1.default.GROUPS_STORE);
                this.data = res['groups'];
            }
            catch (err) {
                throw new Error(`GroupsDB initialization failed: ${err.message}`);
            }
        });
    }
    removeUser(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.getGroupByID(groupID);
            if (group) {
                const found = group.users.indexOf(userID);
                if (found !== -1) {
                    group.users.splice(found, 1);
                    this.updateStore();
                }
            }
        });
    }
    updateStore() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.writeToStore(db_1.default.GROUPS_STORE, JSON.stringify({ groups: this.data }));
        });
    }
}
exports.default = GroupsDB;
//# sourceMappingURL=groupsdb.js.map