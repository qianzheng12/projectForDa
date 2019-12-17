import React, {useState} from 'react'
import './registerPage.css'
import Button from "@material-ui/core/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";

const RegisterConfirmationPage = ({submit,user}) => {
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);

    return (
        <div className="registerForm">
            {uploadImageWindow &&
            <div className="registerUploadThumbnailWrapper">
            <UploadImageWindow
                closeWindow={()=>toggleUploadImageWindow(false)}
                type={"topicThumbnail"}/>
            </div>
            }
            <div className="signUpHeader">
                <h1>SIGN UP</h1>
            </div>

            <div className="addProfileRegister">
                <h1>Add profile picture</h1>
                <div className="registerThumbnail" onMouseEnter={()=>{setCursorOn(true)}}
                     onMouseLeave={() => {setCursorOn(false)}}>
                    <div className="registerThumbnailCover" onClick={() => toggleUploadImageWindow(true)}>
                        {cursorOn&&<AddAPhotoIcon/>}
                    </div>
                    <AccountCircleIcon/>
                </div>

            </div>
            <div className="finishRegisterButton">
                <Button onClick={submit}>Finish</Button>
            </div>
        </div>

    );
};

export default RegisterConfirmationPage;