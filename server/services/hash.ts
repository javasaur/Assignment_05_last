import * as bcrypt from 'bcrypt';

export default class Hash {
    static async hash(str) {
        try {
            const saltRounds = 10;
            const hash = await bcrypt.hash(str, saltRounds);
            return hash;
        } catch (err) {
            throw new Error(`Failed to hash ${str}`);
        }
    }

    static async compare(strToCheck, hash) {
        try {
            const res = await bcrypt.compare(strToCheck, hash);
            return res;
        } catch (err) {
            throw new Error(`Failed to check hash for ${strToCheck}`);
        }
    }
}