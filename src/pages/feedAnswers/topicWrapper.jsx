import React from 'react'
import './feedAnswerPage.css'
import {useQuery} from "@apollo/react-hooks";
import {GET_FEED_ANSWERS, GET_TOPICS} from "../graphQL/query";
import {Link} from 'react-router-dom'
const TopicWrapper = () => {
    const {loading, error, data} = useQuery(GET_TOPICS);
    if (loading) return <div/>;
    if (error) return <div/>;
    const topics = data.topics;
    return (
        <div>
            {
                topics.map(topic => {
                    return (<li><img alt="topicPicture" height="20px" width="20px" src={require('../../resource/topic.png')}/> <Link to={`/Topic/${topic.name}`}><span> #{topic.name}</span></Link> </li>)
                })
            }
        </div>
    );
};

export default TopicWrapper;