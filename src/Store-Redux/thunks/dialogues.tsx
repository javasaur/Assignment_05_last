import {switchDialogueAction} from '../actions/dialogues';

export function switchDialogue(dialogueID) {
    return function(dispatch) {
        dispatch(switchDialogueAction(dialogueID));
    }
}

