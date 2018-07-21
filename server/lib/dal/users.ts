import {contains} from "../../helpers/common";
import {dbQuery, escape} from '../../helpers/db';
import Logger from "../../helpers/logger";
import * as QueryBuilder from '../querybuilders';
import CustomError from "../../helpers/CustomError";

export default class Users {
    static allowedColumns = ['name', 'user_id'];

    static addUser(user) {
        escape(user);
        const query = QueryBuilder.Users.addUser(user.name, user.password, user.age);
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static async existsUserWithID(id: string) {
        return Users.existsUserWithProp('user_id', id);
    }

    static async existsUserWithName(name: string) {
        return Users.existsUserWithProp('name', name);
    }

    static async existsUserWithProp(propName: string, propValue: string) {
        if(!contains(this.allowedColumns, propName)) {
            Logger.log(`Trying to pass unsafe column, possible injection`);
            throw new Error(`DB request failed, try later!`);
        }
        const res = await Users.getUserByProp(propName, propValue, 'no-password').execute();
        return !!res;
    }

    static getAllUsers(...options: string[]) {
        const query = contains(options, 'no-password') ?
            QueryBuilder.Users.getAllUsersOmitPassword() :
            QueryBuilder.Users.getAllUsers();
        return {
            query,
            execute: async () => {
                try {
                    return await dbQuery(query);
                } catch (err) {
                    Logger.log(`Failed to fetch all users, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static getUserByID(id: string) {
        return this.getUserByProp('user_id', id, 'no-password');
    }

    static getUserByName(name: string) {
        return this.getUserByProp('name', name);
    }

    static getUserByProp(propName: string, propValue: string, ...options: string[]) {
        if(!contains(this.allowedColumns, propName)) {
            Logger.log(`Trying to pass unsafe column, possible injection`);
            throw new Error(`DB request failed, try later!`);
        }

        const query = contains(options, 'no-password') ?
            QueryBuilder.Users.getFirstUserByPropOmitPassword(propName, escape(propValue)) :
            QueryBuilder.Users.getFirstUserByProp(propName, escape(propValue));
        return {
            query,
            execute: async () => {
                    const users = await dbQuery(query);
                    return users.length > 0 ? users[0] : null;
            }
        }
    }

    static removeUser(user) {
        if(!user.id) {
            throw new CustomError(`Provide a valid user object with id property`)
        }

        escape(user);
        const query = QueryBuilder.Users.removeUserByID(user.id);
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to delete user with id ${user.id}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static updateUser(user) {
        if(!user.id) {
            throw new CustomError(`Provide a valid user object with id property`)
        }

        escape(user);
        const query = QueryBuilder.Users.updateUserByID(user.id, user);
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to update user with id ${user.id}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }
}

