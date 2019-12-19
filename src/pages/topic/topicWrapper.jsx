import React, {useState} from 'react'
import '../feedAnswers/feedAnswerPage.css'
import {Link} from 'react-router-dom'
import './topicWrapper.css'
import SearchTopicDropDown from "../search/searchTopicDropDown";
const TopicWrapper = ({topics,editMode=false,chooseTopic}) => {
    const [enteredTopic,setEnteredTopic] = useState('');
    return (
        <div className="topicsWrapper">
            {
                topics.map(topic => {
                    const thumbnail = topic.thumbnail||require('../../resource/topic.svg');
                    return (<li><img alt="topicPicture" height="20px" width="20px" src={thumbnail}/> <Link to={`/Topic/${topic.id}`}><span> #{topic.name}</span></Link> </li>)
                })
            }
            {editMode &&<div className="topicWrapperEnterTopic"><li>
                <input value={enteredTopic} onChange={(e)=>setEnteredTopic(e.target.value)} placeholder="Press Enter to add"/></li>
                {enteredTopic.length>0 &&
                <div className="topicWrapperSearchDropdown">
                    <SearchTopicDropDown enteredTopic={enteredTopic}
                                         chooseTopic={(topicName,topicId)=>{
                                             setEnteredTopic('');
                                             chooseTopic(topicId)}}
                                         allowCreate = {false}
                    />
                </div>}
            </div>}
        </div>
    );
};

export default TopicWrapper;