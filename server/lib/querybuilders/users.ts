import {
    ADD_USER,
    DELETE_USER_BY_ID,
    GET_ALL_USERS,
    GET_ALL_USERS_OMIT_PASSWORD,
    GET_FIRST_USER_BY_PROP,
    GET_FIRST_USER_BY_PROP_OMIT_PASSWORD,
    UPDATE_USER_BY_ID
} from "../queries/users";

export default class Users {
    static addUser(name: string, password: string, age: string): string {
        const query = ADD_USER;
        return query
            .replace(/\$NAME/, name)
            .replace(/\$PASSWORD/, password)
            .replace(/\$AGE/, age);
    }

    static getAllUsers(): string {
        return GET_ALL_USERS;
    }

    static getAllUsersOmitPassword(): string {
        return GET_ALL_USERS_OMIT_PASSWORD;
    }

    static getFirstUserByProp(propName: string, propValue: string): string {
        const query = GET_FIRST_USER_BY_PROP;
        return query.replace(/\$PROPNAME/, propName).replace(/\$PROPVALUE/, propValue);
    }

    static getFirstUserByPropOmitPassword(propName: string, propValue: string): string {
        const query = GET_FIRST_USER_BY_PROP_OMIT_PASSWORD;
        return query.replace(/\$PROPNAME/, propName).replace(/\$PROPVALUE/, propValue);
    }

    static removeUserByID(id: string) {
        const query = DELETE_USER_BY_ID;
        return query.replace(/\$ID/, id);
    }

    static updateUserByID(id: string, user: {name: string, age: string}) {
        const query = UPDATE_USER_BY_ID;
        return query
            .replace(/\$ID/, id)
            .replace(/\$NAME/, user.name)
            .replace(/\$AGE/, user.age);
    }
}