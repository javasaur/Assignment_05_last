import {AppState} from "../appState";

export function setMessages(state: AppState, payload): AppState {
    return {
        ...state,
        messages: payload.messages
    }
}

export function switchDialogue(state: AppState, payload): AppState {
    return {
        ...state,
        activeDialogueID: payload.dialogueID
    }
}