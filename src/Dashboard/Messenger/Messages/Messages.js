import React, {useRef, useEffect } from "react";
import {styled} from  "@mui/system";
import MessageHeader from './MessagesHeader';
import {connect} from 'react-redux';
import DUMMY_MESSAGES from './DUMMY_MESSAGES';
import Message from './Message';
//import message from "../../../../../discord-clone-backend/models/message";
import DateSeparator from "./DataSeparator";


const MainContainer = styled("div")({
    height: 'calc(100%-60px)',
    overflow: 'auto',
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
});

const convertDateToHumanReadable = (date, format) =>{
    const map ={
        mm : date.getMonth()+1,
        dd: date.getDate(),
        yy : date.getFullYear().toString().slice(-2),
        yyyy : date.getFullYear(),
    };
    return format.replace(/mm|dd|yy|yyy/gi,(matched) =>map[matched]);
}

const Messages = ({chosenChatDetails, messages}) =>{

    return (
    <MainContainer>
    <MessageHeader name = {chosenChatDetails?.name}/>
    {messages.map((messages,index) => {
        const sameAuthor = 
        index > 0 && 
        messages[index].author._id === messages[index-1].author._id;

        const sameDay = index>0 && convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") === convertDateToHumanReadable(new Date(messages[index-1].date),
        "dd/mm/yy"
        ); 

        console.log(message.data);
        console.log(convertDatetoHumanReadable(new Date(message.date),"dd/mm/yy"));

        console.log(messages);

        return (
            <div key = {message._id} style = {{width: "97%"}}>
            {(! sameDay || index === 0)&& (
                <DateSeparator
                date = {convertDatetoHumanReadable(
                    new Date(messages[index-1].date),
                    "dd/mm/yy"
                )}
                />
            )}
            <Message
            content = {message.content}
            username = {message.author.username}
            sameAuthor = {message.sameAuthor}
            date = {convertDatetoHumanReadable(
                new Date(message.date),
                "dd/mm/yy"
            )}
            sameDay = {message.sameDay}
        
        </div>
        );
    })}
    </MainContainer>
    );
};

const mapStoreStateToProps =({chat}) =>{
    return{
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(Messages);