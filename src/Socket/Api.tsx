import socketIOClient from 'socket.io-client'
import {store} from "../Store-Redux/store";
import {loadMessages} from "../Store-Redux/thunks/dialogues";
import {getAdminNavTree, getNavTree} from "../Store-Redux/thunks/tree";
import {loadAllUsers} from "../Store-Redux/thunks/users";

export class SocketAPI {
    static socket;

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

        SocketAPI.socket.on('treechange', () => {
            store.dispatch(getNavTree(store.getState().loggedUserID));
        });

        SocketAPI.socket.on('admintreechange', () => {
            store.dispatch(getAdminNavTree());
        });

        SocketAPI.socket.on('userschange', () => {
            store.dispatch(loadAllUsers());
        })

        return SocketAPI.socket;
    }



    static subscribeToDialogues(uniqueGroupIDs) {
        for(let groupID of uniqueGroupIDs) {
            SocketAPI.socket.emit('groupSubscription', groupID, store.getState().loggedUserID);
        }
    }
}