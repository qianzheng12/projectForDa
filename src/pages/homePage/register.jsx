import React, {useState} from 'react'
import RegisterPageOne from './registerPageOne'
import RegisterPageTwo from './registerPageTwo'
import './registerPage.css'
import {Auth} from 'aws-amplify';
import RegisterConfirmationPage from "./registerConfirmationPage";

const RegisterPage = () => {
    const [page, setPage] = useState(3);
    const [user, setCurrentUser] = useState("");
    const [userPassword, setUserPassword] = useState();
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
                    setCurrentUser(email);
                    setUserPassword(password);
                    setPage(2)
                }
            )
            .catch(err => alert(err));
    };
    const resendConfirmationCode = () => {
        Auth.resendSignUp(user).then(() => {
            alert('code resent successfully');
        }).catch(e => {
        });
    };
    const submitPin = enteredPin => {
        Auth.confirmSignUp(user, enteredPin)
            .then(() => {
                setPage(3);
            }).catch(err => {
            alert(err);
        });
    };
    const confirmUser = () => {
        Auth.signIn({
            username: user,
            password: userPassword,
        }).then(user => {
            window.location.reload();
        })
            .catch(err => {
                alert(err.message)
            });

    };
    return (
        <div className="registerWrapper">
            {page === 1 &&
            <RegisterPageOne
                submit={submit}/>}
            {page === 2 && <RegisterPageTwo
                submit={submitPin}
                resendConfirmationCode={resendConfirmationCode}/>}}
            {page === 3 &&
            <RegisterConfirmationPage
                submit={confirmUser}/>}
        </div>
    );
};

export default RegisterPage;