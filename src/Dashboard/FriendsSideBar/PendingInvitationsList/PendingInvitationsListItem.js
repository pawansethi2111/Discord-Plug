import React, {useState} from "react";
import {Tooltip, Typography, Box} from "@mui/material";
import Avatar from '../../../shared/components/Avatar';
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import {connect} from "react-redux";
import {getActions} from '../../../store/actions/friendsActions';

const PendingInvitationsListItem = ({
    id,
    username,
    mail,
    acceptFriendInvitation = () =>{},
    rejectFriendInvitation = () =>{},
}) =>{

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleAcceptInvitation = ()  =>{
        console.log(id);       
        acceptFriendInvitation({id});
        setButtonDisabled(true);
    };

    const handleRejectInvitation  = () =>{
        console.log(id);
        rejectFriendInvitation({id});
        setButtonDisabled(true);
    };

    return (
    <Tooltip title = {mail}>
        <div style ={{width: '100%'}}>
            <Box
                sx = {{
                    width :'100%',
                    height: '42px',
                    marginTop : '10px',
                    display: 'flex',
                    alignItems : 'center',
                    justifyContent: 'space-between',

                }}
                >
                <Avatar username = {username}/>
                <Typography
                sx = {{
                    marginLeft: '7px',
                    fontWeight: 700,
                    color : '#8e9297',
                    flexGrow :1
                }}
                variant = 'subtitle1'
                >
                {username}
                </Typography>
            </Box>
            <InvitationDecisionButtons
            disabled ={buttonDisabled}
            acceptInvitationHandler = {handleAcceptInvitation}
            rejectInvitationHandler = {handleRejectInvitation}
        />
        </div>
    </Tooltip>
    );
};

const  mapActionsToProps = (dispatch) =>{
    return{
        ...getActions(dispatch),
    };
};


export default connect(null, mapActionsToProps)(PendingInvitationsListItem);