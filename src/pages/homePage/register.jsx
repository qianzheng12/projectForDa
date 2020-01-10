import React, {useState} from 'react'
import RegisterPageOne from './registerPageOne'
import RegisterPageTwo from './registerPageTwo'
import './registerPage.css'
import {Auth} from 'aws-amplify';
import RegisterConfirmationPage from "./registerConfirmationPage";

/* 
    Register page is used for client to register new account. It contains three steps:
    1. Fill in basic information.
    2. Enter verify code from Email.
    3. Upload thumbnail and finish the regiser.
*/

const RegisterPage = ({signUpStage=1,userEmail, setCurrentUserEmail,userPassword, setUserPassword,setSignIn}) => {
    const [page, setPage] = useState(signUpStage);
    const [currentUserId, setCurrentUserId] = useState("");

    const submit = (email, password,firstName,lastName,university,major,degreeYear) => {
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                "custom:personal":JSON.stringify({
                    firstName:firstName,
                    lastName:lastName
                }),
                "custom:education":JSON.stringify({
                    school:university,
                    major:major,
                    year:degreeYear
                })

            },
        })
            .then(data => {
                    setCurrentUserEmail(email);
                    setUserPassword(password);
                    setCurrentUserId(data.userSub);
                    setPage(2)
                }
            )
            .catch(err => alert(err.message));
    };
    const resendConfirmationCode = () => {
        Auth.resendSignUp(userEmail).then(() => {
            alert('code resent successfully');
        }).catch(e => {
        });
    };
    const submitPin = enteredPin => {
        console.log(userEmail);
        console.log(userPassword)
        Auth.confirmSignUp(userEmail, enteredPin).then
            (() => {
                setPage(3);
            }).catch(err => {
            alert(err.message);
        });
    };
    const confirmUser = () => {
        setSignIn();
    };
    return (
        <div className="authWrapper">
            {page === 1 &&
            <RegisterPageOne
                submit={submit}/>}
            {page === 2 && <RegisterPageTwo
                submit={submitPin}
                resendConfirmationCode={resendConfirmationCode}/>}
            {page === 3 &&
            <RegisterConfirmationPage
                submit={confirmUser} currentUserId={currentUserId}/>}
        </div>
    );
};

export default RegisterPage;