import React, {useState} from 'react'
import './topicCard.css'
import Button from "@material-ui/core/Button";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_TOPIC} from "../graphQL/topicMutation";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";
const TopicCard = ({topic, editMode, setEditMode}) => {
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const [editTopicName, setEditTopicName] = useState(false);
    const [editTopicDescription, setEditTopicDescription] = useState(false);
    const [topicName, setTopicName] = useState(topic.name);
    const [topicDescription, setTopicDescription] = useState(topic.description);
    const [topicThumbnail, setTopicThumbnail] = useState(topic.thumbnail||require('../../resource/topic.svg'));
    const [updateTopicMutation] = useMutation(UPDATE_TOPIC);
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);


    const updateThumbnail = (pictureUrl) => {
        updateTopicMutation({variables:{topicID:topic.id,topicName,topicDescription,topicThumbnail:pictureUrl}}).then(result=>{
            if(result.data){
                setTopicThumbnail(pictureUrl);
                toggleUploadImageWindow(false)
            }

        });
    };
    const updateTopicDescription = () => {
        if(editTopicDescription){
            updateTopicMutation({variables:{topicID:topic.id,topicName,topicDescription,topicThumbnail}}).then(result=>{
                if(result.data){
                    setEditTopicDescription(false)
                }

            })
        }
        else{
            setEditTopicDescription(true)
        }
    }
    const updateTopicName = () => {
        if(editTopicName){
            updateTopicMutation({variables:{topicID:topic.id,topicName,topicDescription,topicThumbnail}}).then(result=>{
                if(result){
                    setEditTopicName(false)
                }
            })
        }
        else{
            setEditTopicName(true)
        }
    };
    return (
        <div className="card">
            {uploadImageWindow &&
            <UploadImageWindow
                fileName={topic}
                closeWindow={()=>toggleUploadImageWindow(false)}
                callback={pictureUrl=>updateThumbnail(pictureUrl)}
                type={"topicThumbnail"}/>
            }
            <div className="topicLeftDiv">
                <div className="topicThumbnail" onMouseEnter={()=>{setCursorOn(true)}}
                     onMouseLeave={() => {setCursorOn(false)}}>
                    <div className="topicThumbnailCover" onClick={() => toggleUploadImageWindow(true)}>
                        {cursorOn&&<AddAPhotoIcon/>}
                    </div>
                    <img src={topicThumbnail}/>
                </div>
                {!editMode &&<Button> <p>+ follow</p></Button>}
                {editMode &&
                <div className="lastUpdateInformation">
                    <p>Last updated by </p>
                    <p style={{color:"#169BD5", textAlign:"center"}}>Chris Chen </p>
                </div>}
            </div>

            <div className="topicRightDiv">
                <div className="topicToolButton">
                    <MoreVertIcon onClick={()=>{setToolWindowOpen(!toolWindowOpen)}}/>
                    {toolWindowOpen &&
                        <div className="topicToolWindow">
                            <div className="topicToolWindowSubSection">
                                <p>Report</p>
                            </div>
                            <div onClick={()=>setEditMode(!editMode)}  className="topicToolWindowSubSection">
                                <p>Manage</p>
                            </div>
                        </div>}
                </div>
                <div className="topicCardHeader">
                    {editTopicName && <input value={topicName} onChange={(e)=>{setTopicName(e.target.value)}}/>}
                    {!editTopicName&&<h1>#{topicName}</h1>}
                    {editMode &&  <p style={{color:"#169BD5", textAlign:"center"}}
                                     onClick={updateTopicName}>{!editTopicName?"Edit":"Save"}</p>}
                </div>
                <div className="topicDescription">
                    {editTopicDescription && <textarea value={topicDescription} onChange={(e)=>{setTopicDescription(e.target.value)}}/>}
                    {!editTopicDescription && <p> {topicDescription}</p>}
                    {editMode &&  <span style={{color:"#169BD5", textAlign:"center"}}
                                        onClick={updateTopicDescription}
                    >{!editTopicDescription?"Edit":"Save"}</span>}
                </div>
            </div>
        </div>
    );
};


export default TopicCard;