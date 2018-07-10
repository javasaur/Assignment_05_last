import HashService from "./hash";
import * as Joi from 'joi';
import * as DAL from '../lib/dal';

export default class Users {
    static async addUser(user) {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(15).required()
                     .error(new Error(`Username should be between 3 and 15 characters`)),
            password: Joi.string().min(6).max(32).required()
                     .error(new Error(`Password should be between 6 and 32 characters`)),
            age: Joi.number().greater(17)
                    .error(new Error(`You must be at least 18 years old`))
        });

        Joi.validate({name: user.name, password: user.password, age: user.age}, schema, function(err) {
            if(err) {
                throw err;
            }
        });

        const hash = await HashService.hash(user.password);
        user.password = hash;
        return DAL.Users.addUser(user);
    }

    static async getAllUsers() {
        return DAL.Users.getAllUsers('no-password');
    }

    static async getUserByID(userID) {
        return DAL.Users.getUserByID(userID);
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
        user.id = userID;
        return DAL.Users.updateUser(user);
    }

    static async removeUser(userID) {
        return DAL.Users.removeUser({id: userID});
    }
}