
import React, {useState} from "react";
import './messageMenu.css'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const MessageBlock = props => {
    const [cursorOn, setCursorOn] = useState(false);
    const [isMenuOpen,openMessageMenu] = useState(false);
    const [isMessageBlockOpen,openMessageBlock] = useState(false);
    const messagesBrief = [{id:1,user:{name:"allan"},briefMessageContent:"Hey you"}
    ,{id:2,user:{name:"Chris"},briefMessageContent:"Like your question"}
    ,{id:3,user:{name:"Qian"},briefMessageContent:"haha"}];
    return (
        <div className="messageBlock">
            <div style={{bottom: isMenuOpen?"250px":"0px"}} className="messageWindow">
                <div onClick={()=>{openMessageMenu(!isMenuOpen)}} className="messageWindowHeader">
                    <p>Message</p>
                    <AddCircleOutlineIcon/>
                </div>
                {messagesBrief.map(messageBrief =>
                    (
                        <div key={messageBrief.id} className="briefMessageContent">
                            <img height="40px" width="40px" src={require('../../resource/profileImg.png')}></img>
                            <h1>{messageBrief.user.name}</h1>
                            <p>{messageBrief.briefMessageContent}</p>
                        </div>
                    )

                )}
            </div>
            <div style={{bottom: isMessageBlockOpen?"250px":"0px"}} className="messageWindow">
                <div onClick={()=>{openMessageMenu(!isMessageBlockOpen)}} className="messageWindowHeader">
                    <p>Message</p>
                    <AddCircleOutlineIcon/>
                </div>
            </div>
        </div>
    )
};
export default MessageBlock