import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/Material";
import MenuItem from "@mui/material/MenuItem";
import {logout} from "../../shared/utils/auth";
import {IconButton} from "@mui/material";
import {connect} from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {getActions} from "../../store/actions/roomActions";

const BasicMenu = ({audioOnly}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) =>{
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () =>{
        setAnchorEl(null);
    };

    const handleAudioOnlyChange = () =>{
        setAudioOnly(!audioOnly);
    };

    return(
        <div>
            <IconButton onClick ={handleMenuOpen} style = {{color : 'white'}}>
            <MoreVertIcon/>
            </IconButton>
                <Menu
                id ="basic-menu"
                anchorEl = {anchorEl}
                open = {open}
                onClose ={handleClose}
                MenuListProps = {{
                    "aria-labelledby" : "basic-button",
                }}
                >
                    <MenuItem onClick = {logout}>Logout</MenuItem>
                    <MenuItem onClick = {handleAudioOnlyChange}>
                    {audioOnly ? "Audio Only Enabled": "Audio only Disabled"}
                    </MenuItem>
                </Menu>
        </div>
    );
};

const mapStoreStateToProps = ({room})=>{
    return{
        ...room,
    };
};


const mapActionsToProps = (dispatch) =>{
    return{
        ...getActions(dispatch),
    }
};


export default connect(mapStoreStateToProps, mapActionsToProps)(BasicMenu);
