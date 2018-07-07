import {
    ADD_USER_TO_TALK,
    COUNT_USERS_UNDER_TALK,
    GET_PRIVATE_TALKS_BY_USER_ID,
    GET_USERS_BY_TALK_ID,
    REMOVE_USER_FROM_TALK
} from "../queries/userstalks";

export default class UsersTalks {
    static addUserToTalk(userID: string, talkID: string) {
        const query = ADD_USER_TO_TALK;
        return query
            .replace(/\$USERID/, userID)
            .replace(/\$TALKID/, talkID);
    }

    static getUsersCountUnderTalk(talkID: string) {
        const query = COUNT_USERS_UNDER_TALK;
        return query.replace(/\$TALKID/, talkID);
    }

    static getPrivateTalksByUserID(userID: string) {
        const query = GET_PRIVATE_TALKS_BY_USER_ID;
        return query.replace(/\$USERID/, userID);
    }

    static getUsersByTalkID(groupID: string) {
        const query = GET_USERS_BY_TALK_ID;
        return query.replace(/\$GROUPID/, groupID);
    }

    static removeUserFromTalk(talkID: string, userID: string) {
        const query = REMOVE_USER_FROM_TALK;
        return query
            .replace(/\$TALKID/, talkID)
            .replace(/\$USERID/, userID);
    }
}