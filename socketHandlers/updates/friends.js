const User = require('../../models/user');

const FriendInvitation = require('../../models/friendInvitation');

const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async(userId) =>{

    try{
        const pendingInvitations = await FriendInvitation.find({
            receiverId: userId

        }).populate('senderId', '_id username mail');
    
        const receiverList = serverStore.getActiveConnections(userId);

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach(receiverScoketId =>{
            io.to(receiverSocketId).emit("friends-invitations",{
                pendingInvitations: pendingInvitations? pendingInvitations : [],
            });
        });
    }   

    catch(err){
        console.log(err);
    }
};

const updateFriends = async(userId) =>{
    try{
        const receiverList = serverStore.getActiveConnections(userId);

        if(receiverList.length > 0){
            const user = await User.findById(userId, {_id :1, friends:1}).populate(
                "friends" ,
                "_id username mail"
            );
    
            if(user){
                const friendsList = user.friends.map( f=>{
                    return {
                        id : f._id,
                        mail: f.mail,
                        username: f.username, 
                    };
                });
    
                const receiverList = serverStore.getActiveConnections(userId);
    
    
                const io = serverStore.getSocketServerInstance();
    
                receiverList.forEach(receiverId =>{
                        io.to(receiverSocketId).emit("friends-list",{
                            friends: friendsList? friendsList : [],
                        });
                });
            }
        }
        
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    updateFriendsPendingInvitations,
    updateFriends

}