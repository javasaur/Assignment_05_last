import {
    ADD_PUBLIC_SUBTALK,
    ADD_PUBLIC_TALK,
    COUNT_DUPLICATE_NAMES_UNDER_PARENT,
    COUNT_DUPLICATE_NAMES_UNDER_ROOT, COUNT_SUBTALKS
} from "../queries/talks";

export default class Talks {
    static addPublicSubtalk (talkName: string, parentID: string) {
        const query = ADD_PUBLIC_SUBTALK;
        return query
            .replace(/\$TALKNAME/, talkName)
            .replace(/\$PARENTID/, parentID);
    }

    static addPublicTalk(talkName: string) {
        const query = ADD_PUBLIC_TALK;
        return query.replace(/\$TALKNAME/, talkName);
    }

    static countSubtalks(parentID: string) {
        const query = COUNT_SUBTALKS;
        return query.replace(/\$PARENTID/, parentID);
    }

    static countDuplicateNamesUnderParent(talkName: string, parentID: string) {
        const query = COUNT_DUPLICATE_NAMES_UNDER_PARENT;
        return query
            .replace(/\$TALKNAME/, talkName)
            .replace(/\$PARENTID/, parentID);
    }

    static countDuplicateNamesUnderRoot(talkName: string) {
        const query = COUNT_DUPLICATE_NAMES_UNDER_ROOT;
        return query.replace(/\$TALKNAME/, talkName);
    }
}