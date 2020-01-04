import React, {useState} from 'react'
import './registerPage.css'
import './signIn.css';
import './homePage.css'
import SignInPage from "./signIn";
import Button from "@material-ui/core/Button";
import RegisterPage from "./register";

/*
  Homepage is the page user going to see when they visit any webpage without valid Auth.
  This page provide the ability to login and register.
**/
const HomePage = ({setSession}) => {
    const [signUpMode, setSignUpMode] =useState(false);
    let imgUrl = require('../../resource/homepage.jpg');
    return (
        <div style={{background:`url(${imgUrl})`}} className="signInPageWrapper">
            {!signUpMode &&<SignInPage setSession={setSession} signUp={()=>{setSignUpMode(true)}}/>}
            {signUpMode && <RegisterPage/>}
        </div>
    );
};

export default HomePage;