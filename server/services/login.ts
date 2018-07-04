import HashService from "../services/hash";
import UsersDB from "../lib/usersdb";

export default class Login {
    static async checkMatch(username: string, password: string) {
        const user = await UsersDB.getInstance().getUserByName(username);
        const userHash = user.password;
        const compare = await HashService.compare(password, userHash);
        return compare ? {accessAllowed: true, id: user.id} : {accessAllowed: false};
    }
}
