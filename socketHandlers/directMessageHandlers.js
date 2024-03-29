const Message = require("../models/message");
const Conversation = require('../models/conversation');

const chatUpdates = require("./updates/chat");

const directMessageHandler = async(socket,data) =>{
    try{
        console.log('direct messag event is being handled'); 

        const {userId} = socket.user;

        const {receiverUserId, content} = data;

        const message = await Message.create({
            content:content,
            authorId: userId,
            date: new Date(),
            type: "DIRECT",
        });

        const conversation = await Conversation.findOne({
            participants: {$all: [useId, receiverId]},

        });

        if(conversation){

            conversation.messages.push(message._id);
            await conversation.save();

            chatUpdates.updateChatHistory(conversation._id.toString());
        
        }

        else{
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId,receiverUserId]
            });
            chatUpdates.updatechatHistory(newConversation._id.toString());
        }

    }

    catch(err){
        console.log(err);
    }
};

module.exports = directMessageHandler;