import {AppState} from "../appState";

export function switchDialogue(state: AppState, payload): AppState {
    return {
        ...state,
        activeDialogueID: payload.dialogueID
    }
}