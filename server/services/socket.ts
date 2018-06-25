import * as sio from "socket.io";

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
        })
        console.log(`initialised socket`);
        return Socket.io
    }

    static notifyByMessagesUpdate(dialogueID) {
        console.log(`inside notifyByMessagesUpdate ${dialogueID}`);
        Socket.io.to(dialogueID).emit('groupSubscription', dialogueID);
        console.log(`after notifyByMessagesUpdate`);
    }

    static io;
}