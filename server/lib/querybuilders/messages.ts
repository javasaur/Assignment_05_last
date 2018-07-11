import {
    ADD_MESSAGE,
    GET_ALL_MESSAGES_BY_TALKID, GET_UNREAD_MESSAGES_COUNT,
    INCREMENT_UNREAD_MESSAGES, NULL_UNREAD_MESSAGES,
    REMOVE_ALL_MESSAGES_FROM_TALK
} from "../queries/messages";

export default class Messages {
    static addMessage(content: string, userID: string, talkID: string) {
        const query = ADD_MESSAGE;
        return query
            .replace(/\$CONTENT/, content)
            .replace(/\$USERID/, userID)
            .replace(/\$TALKID/, talkID);
    }

    static incrementUnreadMessages(talkID: string) {
        const query = INCREMENT_UNREAD_MESSAGES;
        return query.replace(/\$TALKID/, talkID);
    }

    static getAllMessagesByTalkID(talkID: string) {
        const query = GET_ALL_MESSAGES_BY_TALKID;
        return query.replace(/\$TALKID/, talkID);
    }

    static getUnreadMessagesCount(talkID: string, userID: string) {
        const query = GET_UNREAD_MESSAGES_COUNT;
        return query
            .replace(/\$TALKID/, talkID)
            .replace(/\$USERID/, userID)

    }

    static nullUnreadMessages(talkID: string, userID: string) {
        const query = NULL_UNREAD_MESSAGES;
        return query
            .replace(/\$TALKID/, talkID)
            .replace(/\$USERID/, userID)
    }

    static removeAllMessagesFromTalk(talkID: string) {
        const query = REMOVE_ALL_MESSAGES_FROM_TALK;
        return query.replace(/\$TALKID/, talkID);
    }
}