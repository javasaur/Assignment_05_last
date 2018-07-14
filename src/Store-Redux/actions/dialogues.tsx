import {SET_MESSAGES, SWITCH_DIALOGUE} from "./actionTypes";

export function setMessages(messages) {
    return {
        type: SET_MESSAGES,
        payload: {messages}
    }
}

export function switchDialogueAction(activeDialogue) {
    return {
        type: SWITCH_DIALOGUE,
        payload: {activeDialogue}
    }
}