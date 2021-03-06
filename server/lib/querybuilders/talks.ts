import {
    ADD_PRIVATE_TALK,
    ADD_PUBLIC_SUBTALK,
    ADD_PUBLIC_TALK,
    COUNT_DUPLICATE_NAMES_UNDER_PARENT,
    COUNT_DUPLICATE_NAMES_UNDER_ROOT,
    COUNT_SUBTALKS,
    GET_ALL_PUBLIC_TALKS, GET_SIBLING_TALKS, GET_SUBTALKS_BY_PARENTID,
    GET_TALK_BY_ID,
    GET_TALKS_HIERARCHY, MOVE_SUBTALKS_UP,
    REMOVE_TALK_BY_ID
} from "../queries/talks";

export default class Talks {
    static addPrivateTalk(talkID: string) {
        const query = ADD_PRIVATE_TALK;
        return query.replace(/\$TALKID/, talkID);
    }

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

    static getAllPublicTalks() {
        return GET_ALL_PUBLIC_TALKS;
    }

    static getTalkByID(talkID: string) {
        const query = GET_TALK_BY_ID;
        return query.replace(/\$TALKID/, talkID);
    }

    static getSiblingTalks(talkID: string) {
        const query = GET_SIBLING_TALKS;
        return query.replace(/\$TALKID/g, talkID);
    }

    static getSubtalksByParentID(parentID: string) {
        const query = GET_SUBTALKS_BY_PARENTID;
        return query.replace(/\$PARENTID/, parentID);
    }

    static getTalksHierarchy() {
        return GET_TALKS_HIERARCHY;
    }

    static moveSubtalksUp(talkID: string) {
        const query = MOVE_SUBTALKS_UP;
        return query.replace(/\$TALKID/, talkID);
    }

    static removeTalkByID(talkID: string) {
        const query = REMOVE_TALK_BY_ID;
        return query.replace(/\$TALKID/, talkID);
    }
}