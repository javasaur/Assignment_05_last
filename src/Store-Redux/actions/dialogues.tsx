import {SWITCH_DIALOGUE} from "./actionTypes";

export function switchDialogueAction(dialogueID) {
    return {
        type: SWITCH_DIALOGUE,
        payload: {dialogueID}
    }
}