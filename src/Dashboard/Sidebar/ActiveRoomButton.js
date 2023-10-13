import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "../../shared/components/Avatar";
import * as roomHandler from '../../realtimeCommunication/roomHandler';

const ActiveRoomButton = ({
    creatorUsername,
    roomId,
    amountOfParticipants,
    isUserInRoom,
}) => {

    const handleJoinActiveRoom = () =>{
        if(amountOfParticipants<4){
            roomHandler.joinRoom(roomId);
        }
    };

    const activeRoomButtonDisabled = amountOfParticipants >3;
    const roomTitle = `Cretor: ${creatorUsername}.Connected: ${amountOfParticipants}`;

    return (
    <Tooltip title = {roomTitle}>
        <div>
            <Button disabled = {activeRoomButtonDisabled  || isUserInRoom}
            onClick = {handleJoinActiveRoom}
            >
            <Avatar username = {creatorUsername}/>
            </Button>
        </div>
    </Tooltip>
    );
};

export default ActiveRoomButton;
