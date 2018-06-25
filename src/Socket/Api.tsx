import socketIOClient from 'socket.io-client'
import {store} from "../Store-Redux/store";
import {loadMessages} from "../Store-Redux/thunks/dialogues";

export class SocketAPI {
    static emit(channel, msg) {
        SocketAPI.socket.emit(channel, msg);
    }

    static initSocket() {
        SocketAPI.socket = socketIOClient('http://localhost:4000');
        SocketAPI.socket.on('groupSubscription', (dialogueID) => {
            if(store.getState().activeDialogueID == dialogueID) {
                store.dispatch(loadMessages(dialogueID));
            }
        })
        return SocketAPI.socket;
    }

    static socket;

    static subscribeToDialogues(uniqueGroupIDs) {
        for(let groupID of uniqueGroupIDs) {
            SocketAPI.socket.emit('groupSubscription', groupID, store.getState().loggedUserID);
        }
    }
}