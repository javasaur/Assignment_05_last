import {setMessages, switchDialogueAction} from '../actions/dialogues';

export function switchDialogue(dialogueID) {
    return function(dispatch) {
        dispatch(switchDialogueAction(dialogueID));
        dispatch(loadMessages(dialogueID));
    }
}

export function loadMessages(dialogueID) {
    return async function(dispatch) {
        try {
            const httpResponse = await fetch('http://localhost:4000/messages', {
                method: "POST",
                body: JSON.stringify({dialogueID}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const messages = await httpResponse.json();
            dispatch(setMessages(messages));
        } catch (err) {
            console.log(err);
        }
    }
}

