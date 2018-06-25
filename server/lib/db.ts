import * as fs from 'fs';

export default class DB {
    static USERS_STORE = `${__dirname}\\..\\..\\stores\\users.json`;
    static USERS_TO_DIALOGUES_STORE = `${__dirname}\\..\\..\\stores\\userstodialogues.json`;
    static GROUPS_STORE = `${__dirname}\\..\\..\\stores\\groups.json`;
    static SESSIONS_STORE = `${__dirname}\\..\\..\\stores\\sessions.json`;
    static MESSAGES_STORE = `${__dirname}\\..\\..\\stores\\messages.json`;

    static readFromStore(storePath: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(storePath, 'utf8', (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        })
    }

    static async writeToStore(storePath: string, data: any) {
        return new Promise((resolve, reject) => {
            fs.writeFile(storePath, data, 'utf8', (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
        })
    }
}