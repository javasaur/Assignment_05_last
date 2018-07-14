import * as sio from "socket.io";
import MessagesService from './messages';

export default class Socket {
    static emit(channel, msg) {

    }

    static init(server) {
        const io = sio(server);
        Socket.io = io;

        io.on('connection', socket => {
            socket.on('groupSubscription', (groupID, userID) => {
                socket.join(groupID);
            })

            socket.on('nullUnreadMsgCounter', (talkID, userID) => {
                MessagesService.nullDialogueMessages(talkID, userID);
            })

        })
        return Socket.io
    }

    static notifyByMessagesUpdate(dialogueID) {
        Socket.io.to(dialogueID).emit('groupSubscription', dialogueID);
    }

    static notifyOnTreeChange() {
        Socket.io.emit('treechange');
    }

    static io;

    static notifyOnAdminTreeChange() {
        Socket.io.emit('admintreechange');
    }

    static notifyOnUsersChange() {
        Socket.io.emit('userschange');
    }
}