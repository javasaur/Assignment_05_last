import UsersDB from "../lib/usersdb";
import {rethrow} from '../util/helpers';
import * as Joi from 'joi';

export default class Users {
    static async addUserToGroupRelation(userID, groupID) {
        return UsersDB.getInstance().addUserToGroupRelation(userID, groupID);
    }

    static async addUser(user) {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(15).required().error(new Error(`Username should be between 3 and 15 characters`)),
            password: Joi.string().min(6).max(32).required().error(new Error(`Password should be between 6 and 32 characters`)),
            age: Joi.number().greater(17).error(new Error(`You must be at least 18 years old`))
        });
//
        Joi.validate({name: user.name, password: user.password, age: user.age}, schema, function(err) {
            if(err) {
                throw err;
            }
        });
        return UsersDB.getInstance().addUser(user).catch(rethrow);
    }

    static async getAllUsers() {
        return UsersDB.getInstance().getAllUsers().catch(rethrow);
    }

    static async getAssociatedGroupsIDs(userID) {
        return UsersDB.getInstance().getAssociatedGroupsIDs(userID).catch(rethrow);
    }

    static async getUserByID(userID) {
        return UsersDB.getInstance().getUserByID(userID).catch(rethrow);
    }

    static async getPrivateGroupsIDs(userID) {
        return UsersDB.getInstance().getPrivateGroupsIDs(userID).catch(rethrow);
    }

    static async getUsersByIDs(usersIDs) {
        return UsersDB.getInstance().getUsersByIds(usersIDs).catch(rethrow);
    }

    static async updateUser(userID, user) {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(15).required().error(new Error(`Username should be between 3 and 15 characters`)),
            // password: Joi.string().min(6).max(32).required().error(new Error(`Password should be between 6 and 32 characters`)),
            age: Joi.number().greater(17).error(new Error(`You must be at least 18 years old`))
        });

        Joi.validate({name: user.name, age: user.age}, schema, function(err) {
            if(err) {
                throw err;
            }
        });

        return UsersDB.getInstance().updateUser(userID, user);
    }

    static async removeUser(userId) {
        return UsersDB.getInstance().removeUser(userId).catch(rethrow);
    }
}