import React from 'react'
import './homePage.css'
import {mockTopics} from './mockData'
const TopicWrapper = () => {
    return (
        <div>
            {
                mockTopics.map(topic => {
                    return (<li><img alt="topicPicture" height="20px" width="20px" src={require('../../resource/topic.png')}/> <span> #topic name</span> </li>)
                })
            }
        </div>
    );
};

export default TopicWrapper;