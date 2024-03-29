const conversation = require("../../models/conversation");
const Conversation = require("../../models/conversation");

const serverStore = require("../../serverStore");


const updateChatHistory = async(
    conversationId,
    toSpecifiedSocketId = null
) =>{

    const converstaion = await Conversation.findById(conversationId).populate({

        path : "messages",
        model : "Message",
        populate : {
            path:"author",
            model: "User",
            select: "username _id",
        },
    });
    
    if(conversation){
        const io = serverStore.getSocketServerInstance();

        if(toSpecifiedSocketId){
            return io.to(toSpecifiedSocketId).emit('direct-chat-history',{
                messages: converstaion.messages,
                participants: conversation.participants,
            });
        }

        conversation.participants.forEach(userId =>{

            const activeConnections = serverStore.getActiveConnections();


            activeConnections.forEach(socketId =>{
                io.to(socketId).emit('direct-chat-history',{

                    messages :conversation.messages,
                    participants: conversation.participants,

                });
            });
        });
    }
    
}


module.exports = {updateChatHistory};