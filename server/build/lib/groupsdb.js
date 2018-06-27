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
    getGroupByID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.data.find(u => u.id === groupID) || null;
            }
            catch (err) {
                throw new Error(`Failed to fetch group with id ${groupID}: ${err.message}`);
            }
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
    updateStore() {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.default.writeToStore(db_1.default.GROUPS_STORE, JSON.stringify({ groups: this.data }));
        });
    }
}
exports.default = GroupsDB;
//# sourceMappingURL=groupsdb.js.map