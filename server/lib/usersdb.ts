import DB from './db';

export default class UsersDB {
    static instance: UsersDB;
    users: Array<any>;
    usersToDialogues: {};

    constructor() {
    }

    async addUserToGroupRelation(userID, groupID) {
        const user = await this.getUserByID(userID);
        if(!user) {
            throw new Error(`User doesn't exist'`);
        }
        if(!this.usersToDialogues[userID]) {
            this.usersToDialogues[userID] = [];
        }
        this.usersToDialogues[userID].push(groupID);
        this.updateUsersDialoguesStore();
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
            this.updateUsersStore();

        } catch (err) {
            throw new Error(`Failed to add user ${user.name}: ${err.message}`);
        }
    }

    async addUserToDialogueRelation(userID, dialogueID) {
        try {
            let userDialogues = this.usersToDialogues[userID];
            if(!userDialogues) {
                userDialogues = [];
            }
            if(!userDialogues.includes(dialogueID)) {
                userDialogues.push(dialogueID);
            }
            this.updateUsersDialoguesStore();
        } catch (err) {
            throw new Error(`Error adding user-dialogue relation`)
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

    noPasswordUser(user) {
        const {password, ...noPass} = user;
        return noPass;
    }

    async getAllUsers() {
        return this.users.map(this.noPasswordUser);
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

    async getPrivateGroupsIDs(userID) {
        try {
            let ids = [];
            if(this.usersToDialogues[userID]) {
                ids = [...this.usersToDialogues[userID].filter(id => id.includes('_'))];
            }
            return ids;
        } catch (err) {
            throw new Error(`Failed to fetch private groups ids for ${userID}`);
        }
    }

    async getUserByID(userId) {
        try {
            const user = this.users.find(u => u.id === userId);
            if(!user) {
                return null;
            }
            return this.noPasswordUser(user);
        } catch (err) {
            throw new Error(`Failed to fetch user with id ${userId}: ${err.message}`);
        }
    }

    async getUserByName(name) {
        try {
            const user = this.users.find(u => u.name.toUpperCase() === name.toUpperCase());
            if(!user) {
                return null;
            }
            return user;
        } catch (err) {
            throw new Error(`Error fetching user ${name} ${err.message}`);
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

    async getUserPassword(username) {
        try {
            const user = this.users.find(u => u.name.toUpperCase() === username.toUpperCase());
            if(!user) {
                throw new Error(`User not found`);
            }
            return user.password;
        } catch (err) {
            throw new Error(err.message);
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
                this.users.splice(index, 1);
                this.updateUsersStore();
                return;
            }

            throw new Error(`Trying to delete unexisting user ${userID}`);
        } catch (err) {
            throw new Error(`Failed to delete ${userID}: ${err.message}`);
        }
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

    async updateUser(userID, user) {
        try {
            let found = await this.getUserByID(userID);
            if (found) {
                // seems not good
                found.name = user.name;
                if(user.password) {
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
    }

    async updateUsersStore() {
        DB.writeToStore(DB.USERS_STORE, JSON.stringify({users: this.users}));
    }

    async updateUsersDialoguesStore() {
        DB.writeToStore(DB.USERS_TO_DIALOGUES_STORE, JSON.stringify(this.usersToDialogues));
    }
}