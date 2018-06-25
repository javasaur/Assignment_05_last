import DB from './db';
import {genID} from "../util/helpers";

export default class SessionsDB {
    static instance: SessionsDB;
    data: Array<any>;

    constructor() {
    }

    async openSession() {
        try {
            const id = genID();
            // Should be ATOMIC?
            this.data.push(id);
            this.updateStore();
        } catch (err) {
            throw new Error(`Failed opening session: ${err}`);
        }
    }

    async closeAllSessions() {
        this.data.length = 0;
        this.updateStore();
    }

    async getAllSessions() {
        return this.data;
    }

    static getInstance() {
        if(!SessionsDB.instance) {
            SessionsDB.instance = new SessionsDB();
        }
        return SessionsDB.instance;
    }

    async init() {
        try {
            const res = await DB.readFromStore(DB.SESSIONS_STORE);
            this.data = res['sessions'];
        } catch (err) {
            throw new Error(`SessionsDB initialization failed: ${err.message}`);
        }
    }

    async updateStore() {
        DB.writeToStore(DB.SESSIONS_STORE, JSON.stringify({sessions: this.data}));
    }
}