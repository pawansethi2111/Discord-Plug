const serverStore = require("../serverStore");
const roomLeaveHandler = require("./roomLeaveHandler");

const disconnectHandler = (socket) =>{

    const activeRooms = serverStore.getActiveRooms();

    activeRooms.forEach(activeRooms => {
        const userInRoom = activeRoom.participants.some(
        (participant) => participant.socketId  === socket.id
        );

        if(userInRoom){
            roomLeaveHandler(socket, {roomId : activeRoom.roomId});            
        }
    });

    serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;