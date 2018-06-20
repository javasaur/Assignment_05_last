import {IGroup} from "./IGroup";
import {IUser} from "./IUser";

export class Group implements IGroup {
    private _id: number;
    private _groupname: string;
    private _users: IUser[];

    constructor(name: string, id: number) {
        this._groupname = name;
        this._users = [];
        this._id = id;
    }

    static create(name: string, id: number) {
        return new Group(name, id);
    }

    get id(): number {
        return this._id;
    }

    get groupname(): string {
        return this._groupname;
    }

    get users(): IUser[] {
        return this._users;
    }

    getSize() {
        return this.users.length;
    }

    addUser(usr: IUser) {
        this.users.push(usr);
        return true;
    }

    getUsersNames() {
        return this.users.map(elem => elem.username);
    }

    hasUser(usr: IUser) {
        return this.users.indexOf(usr) !== -1;
    }

    set groupname(value: string) {
        this._groupname = value;
    }

    set users(value: IUser[]) {
        this._users = value;
    }

    removeUser(usr: IUser) {
        let index = this.users.indexOf(usr);
        if(index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}