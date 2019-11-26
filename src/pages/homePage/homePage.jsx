import React, {useState} from 'react'
import './registerPage.css'
import './signIn.css';
import './homePage.css'
import SignInPage from "./signIn";
import Button from "@material-ui/core/Button";
import RegisterPage from "./register";
const HomePage = () => {
    const [signInMode, setSignInMode] =useState(false);
    const [registerMode, setRegisterMode] =useState(false);
    let imgUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/566dfa56-2fa2-4aa3-b4d1-e278d836364b/d6fwaio-5cc22ece-335c-4d52-a80c-33590b67e760.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU2NmRmYTU2LTJmYTItNGFhMy1iNGQxLWUyNzhkODM2MzY0YlwvZDZmd2Fpby01Y2MyMmVjZS0zMzVjLTRkNTItYTgwYy0zMzU5MGI2N2U3NjAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.u6pya3DeJ-T5ECifRffYrqEBWYFQ1T9qgvy-MdftCOA'
    return (
        <div style={{background:`url(${imgUrl})`}} className="signInPageWrapper">
            <div className="signInRegisterButtonBar">
                <div className="signInRegisterButtonWrapper">
                    <Button onClick={()=>{setSignInMode(!signInMode)}}>sign in</Button>
                    <Button onClick={()=>{setRegisterMode(!registerMode)}}>register</Button>
                </div>
                {signInMode&&<SignInPage/>}
                {registerMode&&<RegisterPage/>}
            </div>
        </div>
    );
};

export default HomePage;