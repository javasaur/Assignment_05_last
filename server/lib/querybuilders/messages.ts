import {ADD_MESSAGE, GET_ALL_MESSAGES_BY_TALKID} from "../queries/messages";

export default class Messages {
    static addMessage(content: string, userID: string, talkID: string) {
        const query = ADD_MESSAGE;
        return query
            .replace(/\$CONTENT/, content)
            .replace(/\$USERID/, userID)
            .replace(/\$TALKID/, talkID);
    }

    static getAllMessagesByTalkID(talkID: string) {
        const query = GET_ALL_MESSAGES_BY_TALKID;
        return query.replace(/\$TALKID/, talkID);
    }
}