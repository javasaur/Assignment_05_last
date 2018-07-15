import HashService from "../services/hash";
import * as DAL from '../lib/dal';

export default class Login {
    static async checkMatch(username: string, password: string) {
        let accessAllowed = false;
        const user = await DAL.Users.getUserByName(username).execute();
        if(!!user) {
            const userHash = user.password;
            const compare = await HashService.compare(password, userHash);
            accessAllowed = compare;
        }
        return accessAllowed ? {accessAllowed: true, id: user.user_id} : {accessAllowed: false};
    }
}
