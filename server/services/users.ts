import UsersDB from "../lib/usersdb";
import {rethrow} from '../util/helpers';

export default class Users {
    static async addUser(user) {
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
        return UsersDB.getInstance().updateUser(userID, user).catch(rethrow);
    }

    static async removeUser(userId) {
        return UsersDB.getInstance().removeUser(userId).catch(rethrow);
    }
}