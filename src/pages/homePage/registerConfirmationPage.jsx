import React, {useState} from 'react'
import './registerPage.css'
import Button from "@material-ui/core/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_THUMBNAIL} from "../graphQL/userMutation";

/* 
    The page for user to upload thumbnail and finish registration.
*/
const RegisterConfirmationPage = ({submit,currentUserId}) => {
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);
    const [updateThumbnailMutation] = useMutation(UPDATE_THUMBNAIL);
    const [userThumbnail,setUserThumbnail] = useState();
    const updateThumbnail = (pictureUrl) =>{

        updateThumbnailMutation({variables: {thumbnail:pictureUrl}}).then((result) =>{
            setUserThumbnail(pictureUrl);
            toggleUploadImageWindow(false)
        })
    };
    return (
        <div className="registerForm">
            <div className="authWrapperHeader">
                <img width="24px" height="42px" src={require('../../resource/icon.png')}/>
                <span>Singularity</span>
            </div>
            {uploadImageWindow &&
            <div className="registerUploadThumbnailWrapper">
            <UploadImageWindow
                closeWindow={()=>toggleUploadImageWindow(false)}
                fileName={currentUserId.id}
                callback={pictureUrl=>updateThumbnail(pictureUrl)}
                type={"profileThumbnail"}
                type={"topicThumbnail"}/>
            </div>
            }

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