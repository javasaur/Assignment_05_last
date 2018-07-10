import {
    ADD_USER_TO_TALK, ADD_USERS_TO_PRIVATE_TALK,
    COUNT_USERS_UNDER_TALK, COUNT_USERS_UNDER_TALK_BY_USERID,
    GET_PRIVATE_TALKS_BY_USER_ID,
    GET_USERS_BY_TALK_ID, REMOVE_ALL_USERS_FROM_TALK,
    REMOVE_USER_FROM_TALK
} from "../queries/userstalks";

export default class UsersTalks {
    static addUsersToPrivateTalk(talkID: string, firstID: string, secondID: string) {
        const query = ADD_USERS_TO_PRIVATE_TALK;
        return query
            .replace(/\$TALKID/g, talkID)
            .replace(/\$USER1ID/, firstID)
            .replace(/\$USER2ID/, secondID);
    }

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

    static getUsersCountUnderTalkByUserID(userID: string, talkID: string) {
        const query = COUNT_USERS_UNDER_TALK_BY_USERID;
        return query
            .replace(/\$USERID/, userID)
            .replace(/\$TALKID/, talkID);

    }

    static getPrivateTalksByUserID(userID: string) {
        const query = GET_PRIVATE_TALKS_BY_USER_ID;
        return query.replace(/\$USERID/g, userID);
    }

    static getUsersByTalkID(talkID: string) {
        const query = GET_USERS_BY_TALK_ID;
        return query.replace(/\$TALKID/, talkID);
    }

    static removeAllUsersFromTalk(talkID: string) {
        const query = REMOVE_ALL_USERS_FROM_TALK;
        return query.replace(/\$TALKID/, talkID);
    }

    static removeUserFromTalk(talkID: string, userID: string) {
        const query = REMOVE_USER_FROM_TALK;
        return query
            .replace(/\$TALKID/, talkID)
            .replace(/\$USERID/, userID);
    }
}