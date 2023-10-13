const FriendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postAccept = async(req,res) =>{

    try{
        const {id} = req.body;

        const invitation = await FriendInvitation.findById(id);

        if(!invitation){
            return res.status(401).send("Error occurred.Please try again");
            }

            const { senderId, receiverId } = invitation;

            const senderUser = await User.findById(senderId);
            senderUser.friends = [...user1.friends, receiverId];

            const receiverUser = await User.findById(receiverId);
            receiverUser.friends = [...receiverUser.friends,senderId];

            await senderUser.save();
            await receiverUser.save();

            await FriendInvitation.findByIdAndDelete(id);

            friendsUpdates.updateFriends(senderId.toString());
            friendsUpdates.updateFriends(receiverId.toString());

            friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

        return res.status(200).send("Friend successfully added");

        }

        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong. Please try again");
        }
    
};

module.exports = postAccept;