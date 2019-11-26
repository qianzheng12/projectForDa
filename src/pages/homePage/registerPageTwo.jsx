import React, {useState} from 'react'
import './registerPage.css'
import PinInput from "react-pin-input";
import {Formik} from "formik";

const RegisterPageOne = ({submit}) => {
    const enterPin = (value, index)=> {

    }
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
                    onChange={(value, index) => {enterPin(value, index)}}
                    type="numeric"
                    style={{padding: '20px', paddingLeft:'40px'}}
                    inputStyle={{borderColor: 'black', width:'25px', height:'25px', marginLeft:"5px"}}
                    inputFocusStyle={{borderColor: 'black'}}
                    onComplete={(value, index) => {}}
                />
            </div>
        </div>
    );
};

export default RegisterPageOne;