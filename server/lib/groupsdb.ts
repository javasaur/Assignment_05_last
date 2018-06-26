import DB from './db';

export default class GroupsDB {
    static instance: GroupsDB;
    data: Array<any>;

    constructor() {
    }

    async getGroupByID(groupID) {
        try {
            return this.data.find(u => u.id === groupID) || null;
        } catch (err) {
            throw new Error(`Failed to fetch group with id ${groupID}: ${err.message}`);
        }
    }

    async getGroupsByIDs(groupsIDs: Array<any>) {
        try {
            const groups = [];
            for(let id of groupsIDs) {
                const group = await this.getGroupByID(id);
                groups.push({...group});
            }
            return groups;
        } catch (err) {
            throw new Error(`Failed to fetch groups: ${err.message} `);
        }
    }

    async getSecondCompanionID(groupID, firstCompanionID) {
        try {
            const companions = groupID.split('_').filter(id => id !== firstCompanionID);
            if(companions.length > 1) {
                throw new Error('Filtering for getSecondCompanion not worked');
            }
            return companions[0];
        } catch (err) {
            throw new Error(`Failed to fetch second user from group id ${groupID}`);
        }
    }

    async getAllGroups() {
        return this.data || [];
    }

    static getInstance() {
        if(!GroupsDB.instance) {
            GroupsDB.instance = new GroupsDB();
        }
        return GroupsDB.instance;
    }

    async getPublicGroups() {
        return [...this.data].filter(g => !g.id.includes('_'));
    }

    async init() {
        try {
            const res = await DB.readFromStore(DB.GROUPS_STORE);
            this.data = res['groups'];
        } catch (err) {
            throw new Error(`GroupsDB initialization failed: ${err.message}`);
        }
    }

    async updateStore() {
        DB.writeToStore(DB.GROUPS_STORE, JSON.stringify({groups: this.data}));
    }
}