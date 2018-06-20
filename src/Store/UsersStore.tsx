import {IUser} from "./IUser";
import {mockUsers} from "../Mocks/MockUsers";

export class UsersStore {
    static instance: UsersStore;
    private _users: IUser[];

    constructor() {
        this._users = mockUsers;
    }

    static getInstance() {
        if (!UsersStore.instance) {
            UsersStore.instance = new UsersStore();
        }

        return UsersStore.instance;
    }

    getUsername(userId: number) {
        const user = this._users.find((elem) => {
            return elem.id === userId;
        });
        return !!user ? user.username : 'NOT FOUND';
    }

    getUserByName(username: string) {
        const user = this._users.find((u) => {
            return u.username.toUpperCase() === username.toUpperCase();
        });
        return user;
    }

    get users(): IUser[] {
        return this._users;
    }
}