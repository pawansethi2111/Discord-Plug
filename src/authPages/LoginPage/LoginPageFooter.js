import React from "react";
import CustomerPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import {useHistory} from "react-route-dom";
import {Tooltip} from "@mui/material";

const getFormNotValidMessage = ()=>{
    return 'Enter correct E-mail address and password should contains between 6 and 12 characters';
}

const getFormValidMessage = () =>{
    return "Press to log in!";
};

const LoginPageFooter =({handleLogin, isFormValid})=>{

    const history = useHistory();

    const handlePushToRegisterPage = () =>{
        history.push("/register");
    };

    return(
        <>
        <Tooltip
        title = {!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>
        
        <div>
            <CustomerPrimaryButton
            label = "Log in"
            additionalStyles={{marginTop : "30px"}}
            disabled= {!isFormValid}
            onClick ={handleLogin}
            />
        </div>
        </Tooltip>
        <RedirectInfo
        text = 'Need for an account?'
        redirectText='Create an account'
        additionalStyles = {{marginTop: '5px'}}
        redirectHandler = {handlePushToRegisterPage}
        />
        </>
    );
};


export default LoginPageFooter;