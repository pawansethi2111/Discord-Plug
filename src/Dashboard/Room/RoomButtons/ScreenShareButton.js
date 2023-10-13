import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from  "@mui/icons-material/StopScreenShare";
import { setScreenSharingStream } from "../../../store/actions/roomActions";
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler";

const constraints = {
    audio: false,
    video: true 
}

const ScreenShareButton = ({localStream, screenShareStream,setIsScreenSharingStream ,isScreenSharingActive}) =>
{
//    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);

  //  const handleScreenShareToggle = async() =>{
        if(!isScreenSharingActive){
            let stream= null;
            try{
                stream = await navigator.mediaDevices.getDisplayMedia(constraints);
            }
            catch(err){
                console.log('error occurred when trying to get an access to screen share stream');
            }
            if (stream){
                setScreenSharingStream(stream);
                webRTCHandler.switchOutgoinigTracks(stream);
            }
        }

        else{
            webRTCHandler.switchOutgoinigTracks(localStream);
            screenShareStream.getTracks().forEach(t=>t.stop());
            setScreenSharingStream(null);
        }
    };

    return(
    <IconButton onClick = {handleScreenShareToggle} style  = {{color: "white"}}>
    {isScreenSharingActive ? <StopScreenShareIcon/> : <ScreenShareIcon/>}
    </IconButton>
    );
//};

export default ScreenShareButton;