import * as bcrypt from 'bcrypt';
import Logger from "../lib/logger";

export default class Hash {
    static async hash(str) {
        try {
            const saltRounds = 10;
            const hash = await bcrypt.hash(str, saltRounds);
            return hash;
        } catch (err) {
            Logger.log(`Failed to hash ${str}: ${JSON.stringify(err.message)}`);
            throw new Error(`Something went wrong. Try again later!`);
        }
    }

    static async compare(strToCheck, hash) {
        try {
            const res = await bcrypt.compare(strToCheck, hash);
            return res;
        } catch (err) {
            Logger.log(`Failed to compare hash for ${strToCheck}: ${JSON.stringify(err.message)}`);
            throw new Error(`Something went wrong. Try again later!`);
        }
    }
}