import React, {useState} from 'react'
import './registerPage.css'
import {Auth} from 'aws-amplify';
import {Formik} from "formik";
import './signIn.css';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FacebookIcon from '@material-ui/icons/Facebook';
/*  Page for user to Signin
    Information are sent to Amplify Cognito for verification.
*/
const SignInPage = ({signUp, setSession,needConfirm}) => {
    let imgUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/566dfa56-2fa2-4aa3-b4d1-e278d836364b/d6fwaio-5cc22ece-335c-4d52-a80c-33590b67e760.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU2NmRmYTU2LTJmYTItNGFhMy1iNGQxLWUyNzhkODM2MzY0YlwvZDZmd2Fpby01Y2MyMmVjZS0zMzVjLTRkNTItYTgwYy0zMzU5MGI2N2U3NjAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.u6pya3DeJ-T5ECifRffYrqEBWYFQ1T9qgvy-MdftCOA'
    const [checked, setChecked] = useState(false);
    const [rememberMe,setRememberMe] = useState(false);
    const signIn = (values) => {
        Auth.signIn({
            username: values.userEmail,
            password: values.password,
        }).then(user => {
            setSession(rememberMe)
        })
            .catch(err => {
                if(err.name==="UserNotConfirmedException"){
                    needConfirm(values);
                }
                else{
                    alert(err.message)
                }

            });
    }
    return (
        <div className="authWrapper">
            <div className="registerForm">
                <Formik
                    initialValues={{userEmail: '', password: ''}}

                    onSubmit={(values, {setSubmitting}) => {
                        signIn(values);
                    }}
                >{({
                       values,
                       handleChange,
                       handleSubmit,
                   }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="authWrapperHeader">
                            <img width="24px" height="42px" src={require('../../resource/icon.png')}/>
                            <span>Singularity</span>
                        </div>
                        <div className="signInWrapper">
                            <input
                                className="loginInput"
                                placeholder="Email: "
                                name="userEmail"
                                value={values.userEmail}
                                onChange={handleChange}/>
                            <input
                                className="loginInput"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}/>
                            <div className="signInHelpTool">
                                <input type="checkbox" className="checkBox" value={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}/>
                                <span id="rememberMe">Remember me</span>
                                <span id="forgetPassword">forgot password</span>
                            </div>
                        </div>
                        <div className="signInActions">
                            <Button type="submit" style={{background: "#E36100"}}>Login</Button>
                            <Button onClick={signUp}
                                    style={{background: "#FFE9D9", marginTop: "20px", color: "#E36100"}}>Sign
                                up</Button>
                            <div className="socialMediaActions">
                                <span>You can continue with</span>
                                <FacebookIcon/>
                                <img src={require('../../resource/Google__G__Logo.svg')}/>
                            </div>
                        </div>

                    </form>
                )}
                </Formik>
            </div>
        </div>
    );
};

export default SignInPage;