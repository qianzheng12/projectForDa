import React  from 'react'
import './registerPage.css'
import PinInput from "react-pin-input";
const RegisterPageOne = ({submit,resendConfirmationCode}) => {
    let enteredPin = "";

    const submitPin = ()=> {
        submit(enteredPin)
    };

    return (
        <div className="registerForm">
            <div className="signUpHeader">
                <h1>SIGN UP</h1>
            </div>
            <div className="pinHints">
                <p>Please check your email for the verification code and enter it below:</p>
            </div>
            <div className="pinInputArea">
                <PinInput
                    length={6}
                    initialValue=""
                    type="numeric"
                    style={{padding: '20px', paddingLeft:'40px'}}
                    inputStyle={
                        {borderColor: '#808080', width:'25px', height:'25px', marginLeft:"5px", borderRadius:"5px"}}
                    inputFocusStyle={{borderColor: 'black'}}
                    onComplete={(value) => {enteredPin = value}}
                />
            </div>
            <div className="resendWrapper">
                <p>Didn't receive email? <span onClick={resendConfirmationCode}>Send again</span>.</p>
            </div>

            <div className="nextSignUpPageButton">
                <button onClick={submitPin} type="submit">Submit</button>
            </div>
        </div>

    );
};

export default RegisterPageOne;