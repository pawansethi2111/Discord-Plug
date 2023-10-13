const serverStore = require("../../serverStore");

const updateRooms = (toSpecifiedSocketId = null) =>{
    const io = serverStore.getSocketServerInstance();
    const activeRooms = serverStore.getAcctiveRooms();

    if(toSpecifiedTargetId){
        io.to(toSpecifiedTargetId).emit("active-rooms",{
            activeRooms,
        });
    }
    else{
        io.emit("active-rooms",{
            activeRooms,
        });
    }
};

module.exports= {
    updateRooms,
};