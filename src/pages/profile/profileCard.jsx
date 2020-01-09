
import React, {useState} from "react";
import './profilePage.css'
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SendIcon from '@material-ui/icons/Send';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {USER_INFORMATION} from "../graphQL/userQuery";
import {UPDATE_THUMBNAIL} from "../graphQL/userMutation";
import VisibilityIcon from '@material-ui/icons/Visibility';
const ProfileCard = ({userInformation,isMe,toggleVisitorMode}) => {
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);
    const [updateThumbnailMutation] = useMutation(UPDATE_THUMBNAIL);
    const [userThumbnail,setUserThumbnail] = useState(userInformation.thumbnail);

    const updateThumbnail = (pictureUrl) =>{

        updateThumbnailMutation({variables: {thumbnail:pictureUrl}}).then((result) =>{
            setUserThumbnail(pictureUrl);
            toggleUploadImageWindow(false)
        })
    };
    return (
        <div className="card">
            {uploadImageWindow &&
                <UploadImageWindow
                    fileName={userInformation.id}
                    closeWindow={()=>toggleUploadImageWindow(false)}
                    callback={pictureUrl=>updateThumbnail(pictureUrl)}
                    type={"profileThumbnail"}/>
            }
            <div className="profileCardTop">
                <div className="profileThumbnail" onMouseEnter={()=>{setCursorOn(true)}}
                     onMouseLeave={() => {setCursorOn(false)}}>
                    <div className="profileThumbnailCover" onClick={() => toggleUploadImageWindow(true)}>
                        {cursorOn&&<AddAPhotoIcon/>}
                    </div>
                    <img onClick={() => toggleUploadImageWindow(true)} height="130px" width="130px" src={userThumbnail}/>
                </div>
                <div className="profileName">
                    <h1>{userInformation.firstName+' '+ userInformation.lastName}</h1>
                </div>
                <div className="profileHeaderAction">
                    <Button id="followNumber"> <PersonAddIcon/><span>32k</span></Button>
                    {!isMe&&<Button id="message"><SendIcon/> <span>Message</span></Button>}
                    {isMe &&<Button id="preview" onClick={toggleVisitorMode}><VisibilityIcon/> <span>Preview</span></Button>}
                </div>
            </div>
            <div className="profileCardBottom">
                <div className="profileUniversityIntro">
                    <ul>
                        <li>{userInformation.school}</li>
                        <li>{userInformation.major}</li>
                        <li>{userInformation.year}</li>
                    </ul>
                </div>
                <div className="profileUniversityLogo">
                    <img height="55px" width="200px" src={require('../../resource/profileUniveristyLog.png')}/>
                </div>
            </div>
        </div>
    )
};
export default ProfileCard