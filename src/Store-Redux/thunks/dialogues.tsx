import {setMessages, switchDialogueAction} from '../actions/dialogues';
import axios from 'axios';

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
            // console.log(err);
        }
    }
}

export function switchDialogue(dialogueID, dialogueType, dialogueName) {
    return function(dispatch) {
        dispatch(switchDialogueAction({
            id: dialogueID,
            name: dialogueName,
            type: dialogueType
        }));
        dispatch(loadMessages(dialogueID));
    }
}

export function loadMessages(dialogueID) {
    return async function(dispatch) {
        try {
            const res = await axios.post('http://localhost:4000/messages', {dialogueID});
            const messages = res.data;
            dispatch(setMessages(messages));
        } catch (err) {
            console.log('Failed to fetch messages');
        }
    }
}

