import UsersDB from "./usersdb";
import SessionsDB from "./sessionsdb";
import {rethrow} from "../util/helpers";
import MessagesDB from "./messagesdb";
import GroupsDB from "./groupsdb";

export default class DBManager {
    static instance: DBManager;
    usersDB: UsersDB;
    groupsDB: GroupsDB;
    sessionsDB: SessionsDB;
    messagesDB: MessagesDB;
    storesReady: boolean

    constructor() {
        this.storesReady = false;
        this.usersDB = UsersDB.getInstance();
        this.groupsDB = GroupsDB.getInstance();
        this.sessionsDB = SessionsDB.getInstance();
        this.messagesDB = MessagesDB.getInstance();
    }

    static getInstance() {
        if(!DBManager.instance) {
            DBManager.instance = new DBManager();
        }
        return DBManager.instance;
    }

    async initStores() {
        return Promise.all(
            [
                this.usersDB.init(),
                this.sessionsDB.init(),
                this.messagesDB.init(),
                this.groupsDB.init()
            ])
            .then(() => {
                console.log('All stores are initialised!');
                this.storesReady = true
            })
            .catch(rethrow);
    }

    isReady() {
        return this.storesReady;
    }
}