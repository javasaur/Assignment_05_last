import {contains} from "../../helpers/common";
import {dbQuery, escape} from '../../helpers/db';
import Logger from "../../helpers/logger";
import * as QueryBuilder from '../querybuilders';
import CustomError from "../../helpers/CustomError";

export default class Users {
    static allowedColumns = ['name', 'user_id'];

    static async addUser(user) {
        try {
            if(await Users.existsUserWithName(user.name)) {
                throw new CustomError(`Username ${user.name} is busy `);
            }
            escape(user);
            const query = QueryBuilder.Users.addUser(user.name, user.password, user.age);
            await dbQuery(query);
            return true;
        } catch (err) {
            if(err instanceof CustomError) {
                throw err;
            }

            // DB errors
            Logger.log(`Failed to add user ${user.name} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
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
        const res = await Users.getUserByProp(propName, escape(propValue), 'no-password');
        return !!res;
    }

    static async getAllUsers(...options: string[]) {
        try {
            const query = contains(options, 'no-password') ?
                QueryBuilder.Users.getAllUsersOmitPassword() :
                QueryBuilder.Users.getAllUsers();
            return await dbQuery(query);
        } catch (err) {
            Logger.log(`Failed to fetch all users, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async getUserByID(id: string) {
        return this.getUserByProp('user_id', id, 'no-password');
    }

    static async getUserByName(name: string) {
        return this.getUserByProp('name', name);
    }

    static async getUserByProp(propName: string, propValue: string, ...options: string[]) {
        try {
            if(!contains(this.allowedColumns, propName)) {
                Logger.log(`Trying to pass unsafe column, possible injection`);
                throw new Error(`DB request failed, try later!`);
            }

            const query = contains(options, 'no-password') ?
                QueryBuilder.Users.getFirstUserByPropOmitPassword(propName, escape(propValue)) :
                QueryBuilder.Users.getFirstUserByProp(propName, escape(propValue));
            const users = await dbQuery(query);
            return users.length > 0 ? users[0] : null;
        } catch (err) {
            Logger.log(`Failed to fetch user by prop ${propName} - ${propValue}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async removeUser(user) {
        try {
            if(!user.id) {
                throw new CustomError(`Provide a valid user object with id property`)
            }

            const query = QueryBuilder.Users.removeUserByID(user.id);
            await dbQuery(query);
            return true;
        } catch (err) {
            if(err instanceof CustomError) {
                throw err;
            }

            Logger.log(`Failed to delete user with id ${user.id}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async updateUser(user) {
        try {
            if(!user.id) {
                throw new CustomError(`Provide a valid user object with id property`)
            }
            escape(user);
            const query = QueryBuilder.Users.updateUserByID(user.id, user);
            await dbQuery(query);
            return true;
        } catch (err) {
            if(err instanceof CustomError) {
                throw err;
            }

            Logger.log(`Failed to update user with id ${user.id}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }
}

