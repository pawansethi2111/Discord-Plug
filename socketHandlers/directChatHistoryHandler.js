const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

const directChatHistory = async(socket,data) =>{

    try{
        const {userId} = socket.user;
        const{ receiverId} = data;

        const conversation = await Conversation.findOne({

            participants: {$all : [userId, receiverId]},
            type: "DIRECT",
        });

        if(conversation){
            chatUpdates.updateChatHistory(conversation._id.toString(),socket.id);
        }

    }

    catch(err){
        console.log(err);
    }
};

module.exports = directChatHistoryHandler;