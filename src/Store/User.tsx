import {IUser} from "./IUser";

export class User implements IUser {
    private _username: string;
    private _password: string;
    private _age: number;
    private _id: number;

    constructor(name: string, password: string, age: number, id: number) {
        this._username = name;
        this._password = password;
        this._age = age;
        this._id = id;
    }

    static create(name: string, password: string, age: number, id: number) {
        return new User(name, password, age, id);
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get age(): number {
        return this._age;
    }

    get id(): number {
        return this._id;
    }
    
    set password(value: string) {
        this._password = value;
    }

    set age(value: number) {
        this._age = value;
    }
}