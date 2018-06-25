import DB from './db';

export default class UsersDB {
    static instance: UsersDB;
    users: Array<any>;
    usersToDialogues: {};

    constructor() {
    }

    async addUser(user) {
        try {
            const filtered = this.users.filter(u => u.name.toUpperCase() === user.name.toUpperCase());
            if(filtered.length > 0) {
                throw new Error(`Username is busy`);
            }

            // temp, add uuid or other id gen stuff
            const id = this.users.length + Date.now() + '';
            const u = {...user, id: id};

            // SHOULD BE UPDATED ATOMIC?!
            this.users.push(u);
            this.updateStore();

        } catch (err) {
            throw new Error(`Failed to add user ${user.name}: ${err.message}`);
        }
    }

    async checkMatch(username: string, password: string) {
        try {
            let foundMatch = false, id = null;
            const found = this.users.find(u => {
                return u.name.toUpperCase() === username.toUpperCase() && u.password === password;
            })
            if(found) {
                foundMatch = true;
                id = found.id;
            }
            return {foundMatch, id};
        } catch (err) {
            throw new Error(`Failed to check credentials for ${username}`);
        }
    }

    async getAllUsers() {
        return this.users;
    }

    async getAssociatedGroupsIDs(userID) {
        return this.usersToDialogues[userID] || [];
    }

    static getInstance() {
        if(!UsersDB.instance) {
            UsersDB.instance = new UsersDB();
        }
        return UsersDB.instance;
    }

    async getUserByID(userId) {
        try {
            return this.users.find(u => u.id === userId) || null;
        } catch (err) {
            throw new Error(`Failed to fetch user with id ${userId}: ${err.message}`);
        }
    }

    async getUsersByIds(usersIDs: Array<any>) {
        try {
            const users = [];
            for(let id of usersIDs) {
                const user = await this.getUserByID(id);
                users.push({...user});
            }
            return users;
        } catch (err) {
            throw new Error(`Failed to fetch users: ${err.message} `);
        }
    }

    async init() {
        try {
            let res = await DB.readFromStore(DB.USERS_STORE);
            this.users = res['users'];
            res = await DB.readFromStore(DB.USERS_TO_DIALOGUES_STORE);
            this.usersToDialogues = res;
        } catch (err) {
            throw new Error(`UserDB initialization failed: ${err.message}`);
        }
    }

    async removeUser(userID) {
        try {
            let index = -1;
            const found = this.users.find((u,i) => {
                index = i;
                return u.id === userID;
            })

            if(found) {
                // SHOULD BE UPDATED ATOMIC?!
                this.users.splice(index, 1);
                this.updateStore();
            }

            throw new Error(`Trying to delete unexisting user ${userID}`);
        } catch (err) {
            throw new Error(`Failed to delete ${userID}: ${err.message}`);
        }
    }

    async updateUser(userID, user) {
        try {
            let found = await this.getUserByID(userID);
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
    }

    async updateStore() {
        DB.writeToStore(DB.USERS_STORE, JSON.stringify({users: this.users}));
    }
}