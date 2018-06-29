import DB from './db';

export default class GroupsDB {
    static instance: GroupsDB;
    data: Array<any>;

    constructor() {
    }

    async addUser(userID, groupID) {
        const group = await this.getGroupByID(groupID);
        if(group) {
            if(group.users.includes(userID)) {
                throw new Error(`User already in group`);
            }
            group.users.push(userID);
            this.updateStore();
        }
    }

    async addGroupUnderParent(name, parentID) {
        const parent = await this.getGroupByID(parentID);
        if(parent.users.length > 0) {
            throw new Error('Group contains users, subgroup not allowed');
        }
        const siblings = await this.getGroupsByIDs(parent.groups);
        for(let sibling of siblings) {
            if(sibling.name.toUpperCase() === name.toUpperCase()) {
                throw new Error('One of the future siblings has the same groupname')
            }
        }

        const newGroup = {
            type: 'group',
            name,
            id: this.data.length + Date.now()  + '',
            'parentID': parentID,
            groups: [],
            users: [],
            items: []
        };
        parent.groups.push(newGroup.id);
        this.data.push(newGroup);
        this.updateStore();
    }

    async addRootGroup(name) {
        const rootGroups = await this.getPublicGroups('root');
        const found = rootGroups.find(u => u.name.toUpperCase() === name.toUpperCase());
        if(found) {
            throw new Error(`Name is busy`);
        }
        this.data.push({
            type: 'group',
            name,
            id: this.data.length + Date.now()  + '',
            'parentID': null,
            groups: [],
            users: [],
            items: []
        });
        this.updateStore()
    }

    async addPrivateGroup(groupID) {
        const group = {
            "type": "group",
            "name": "PM",
            "id": groupID,
            "parentID": null,
            "groups": [],
            "users": []
        }
        this.data.push(group);
        this.updateStore();
    }

    async addUserIfMissing(userID, groupID) {
        const group = await this.getGroupByID(groupID);
        if(!group['users'].includes(userID)) {
            group['users'].push(userID);
            this.updateStore();
        }
    }

    async getGroupByID(groupID) {
        return this.data.find(u => u.id === groupID) || null;
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

    async getPublicGroups(filter) {
        if(filter === 'root') {
            return [...this.data].filter(g => !g.id.includes('_') && g.parentID === null);
        }
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

    async removeUser(userID, groupID) {
        const group = await this.getGroupByID(groupID);
        if(group) {
            const found = group.users.indexOf(userID);
            if(found !== -1) {
                group.users.splice(found, 1);
                this.updateStore();
            }
        }
    }

    async updateStore() {
        DB.writeToStore(DB.GROUPS_STORE, JSON.stringify({groups: this.data}));
    }
}