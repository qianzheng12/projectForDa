
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
const ProfileCard = props => {
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);
    const [updateThumbnailMutation] = useMutation(UPDATE_THUMBNAIL);
    const {loading,data,refetch} = useQuery(USER_INFORMATION);
    if (loading) {
        return <div/>
    }
    const {me} = data;
    const updateThumbnail = (pictureUrl) =>{

        updateThumbnailMutation({variables: {thumbnail:pictureUrl}}).then((result) =>{
            refetch();
            toggleUploadImageWindow(false)
        })
    }
    return (
        <div className="card">
            {uploadImageWindow &&
                <UploadImageWindow
                    fileName={me.id}
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
                    <img onClick={() => toggleUploadImageWindow(true)} height="130px" width="130px" src={me.thumbnail}/>
                </div>
                <div className="profileName">
                    <h1>Allan Yang</h1>
                </div>
                <div className="profileHeaderAction">
                    <Button id="followNumber"> <PersonAddIcon/><span>32k</span></Button>
                    <Button id="message"><SendIcon/> <span>message</span></Button>
                </div>
            </div>
            <div className="profileCardBottom">
                <div className="profileUniversityIntro">
                    <ul>
                        <li>University of Illinois at Urbana-Champaign</li>
                        <li>Mathematics</li>
                        <li>Undergraduate Junior</li>
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