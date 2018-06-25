import UsersDB from "../lib/usersdb";
import {rethrow} from '../util/helpers';

export default class Login {
    static async checkMatch(username: string, password: string) {
        return UsersDB.getInstance().checkMatch(username, password).catch(rethrow);
    }
}