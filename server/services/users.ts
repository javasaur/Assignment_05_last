import HashService from "./hash";
import * as Joi from 'joi';
import * as DAL from '../lib/dal';
import CustomError from "../helpers/CustomError";
import {_throw, logAndThrow} from "../helpers/common";
import {DEFAULT_SQL_ERROR} from "../helpers/db";

export default class Users {
    static async addUser(user) {
        try {
            // Validation
            const schema = Joi.object().keys({
                name: Joi.string().min(3).max(15).required()
                    .error(new CustomError(`Username should be between 3 and 15 characters`)),
                password: Joi.string().min(6).max(32).required()
                    .error(new CustomError(`Password should be between 6 and 32 characters`)),
                age: Joi.number().greater(17)
                    .error(new CustomError(`You must be at least 18 years old`))
            });

            Joi.validate({name: user.name, password: user.password, age: user.age}, schema, function(err) {
                if(err) {
                    throw err;
                }
            });

            if(await DAL.Users.existsUserWithName(user.name)) {
                throw new CustomError(`Username ${user.name} is busy `);
            }

            // Hashing
            const hash = await HashService.hash(user.password);
            user.password = hash;

            return await DAL.Users.addUser(user).execute();
        } catch (err) {
            err instanceof CustomError ? _throw(err) : logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }

    static async getAllUsers() {
        try {
            return await DAL.Users.getAllUsers('no-password').execute();
        } catch (err) {
            logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }

    static async getUserByID(userID) {
        try {
            return await DAL.Users.getUserByID(userID).execute();
        } catch (err) {
            logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }

    static async updateUser(userID, user) {
        try {
            const schema = Joi.object().keys({
                name: Joi.string().min(3).max(15).required().error(new CustomError(`Username should be between 3 and 15 characters`)),
                // password: Joi.string().min(6).max(32).required().error(new Error(`Password should be between 6 and 32 characters`)),
                age: Joi.number().greater(17).error(new CustomError(`You must be at least 18 years old`))
            });

            Joi.validate({name: user.name, age: user.age}, schema, function(err) {
                if(err) {
                    throw err;
                }
            });
            user.id = userID;
            return await DAL.Users.updateUser(user).execute();
        } catch (err) {
            err instanceof CustomError ? _throw(err) : logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }

    // static async removeUser(userID) {
    //     try {
    //         return await DAL.Users.removeUser({id: userID}).execute();
    //     } catch (err) {
    //         logAndThrow(err, DEFAULT_SQL_ERROR);
    //     }
    // }
}