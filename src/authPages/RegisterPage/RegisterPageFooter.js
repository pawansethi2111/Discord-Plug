import React from "react";
import CustomerPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import {useHistory} from "react-route-dom";
import {Tooltip} from "@mui/material";

const getFormNotValidMessage = ()=>{
    return "Username should contain between 3 and 12 characters and password should contain between 6 and 12 characters. Also corrct email address should be provided";
};

const getFormValidMessage = () =>{
    return "Press to register!";
};

const RegisterPageFooter =({handleRegister, isFormValid})=>{

    const history = useHistory();

    const handlePushToLoginPage = () =>{
        history.push("/login");
    };

    return(
        <>
        <Tooltip
        title = {!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>
        
        <div>
            <CustomerPrimaryButton
            label = "Register"
            additionalStyles={{marginTop : "30px"}}
            disabled= {!isFormValid}
            onClick ={handleRegister}
            />
        </div>

        </Tooltip>
        <RedirectInfo
        text = ""
        redirectText= "Already have an account ?"
        additionalStyles = {{marginTop: "5px"}}
        redirectHandler = {handlePushToLoginPage}
        />
        
        </>
    );
};


export default RegisterPageFooter;