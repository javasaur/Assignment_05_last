import {setMessages, switchDialogueAction} from '../actions/dialogues';

export function sendMessage(dialogueID, authorId, message) {
    return async function(dispatch) {
        try {
            const msg = {
                authorId,
                content: message,
                dateTimestamp: Date.now() / 1000,
            }
            await fetch('http://localhost:4000/messages/add', {
                method: "POST",
                body: JSON.stringify({dialogueID, message: msg}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            dispatch(loadMessages(dialogueID));
        } catch (err) {
            console.log(err);
        }
    }
}

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

