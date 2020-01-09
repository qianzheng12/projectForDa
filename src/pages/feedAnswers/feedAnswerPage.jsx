import React, {useEffect, useState} from 'react'
import './feedAnswerPage.css'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "../topic/topicWrapper";
import {useQuery} from '@apollo/react-hooks';
import ImageUploader from 'react-images-upload';
import {GET_FEED_ANSWERS, GET_TOPICS} from '../graphQL/query'

const FeedAnswerPage = ({setSelectedPage,bookMarkedAnswers}) => {
    const getTopicsResult = useQuery(GET_TOPICS);
    const {loading, error, data} = useQuery(GET_FEED_ANSWERS);
    const [leftMargin, setLeftMargin] = useState("20vw");
    const [showTopic, toggleShowTopic] = useState(true);
    setSelectedPage("Home");
    if (loading) return <div/>;
    if (error) return <div/>;
    if (getTopicsResult.loading) return <div/>;
    if (getTopicsResult.error) return <div/>;
    const topics = getTopicsResult.data.topics;
    const {questions} = data;
    return (
        <div className="homePage">
            <div className="homePageContent" style={{marginLeft: leftMargin}}>
                <div className="feedAnswers">
                    {questions.map(question => {
                        const {answers} = question;
                        if(answers.length >= 1){
                            return (
                                <div className="feedAnswer">
                                    <FeedAnswerCard bookmarked={bookMarkedAnswers.some((b)=>{return b.id === answers[0].id})}
                                                    key={question.id} question={question} answer={answers[0]} profileBookmarkAnswer={false} showAction={true}/>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
                {showTopic &&
                <div className="topics">
                    <div className="topicHeader">
                        <p>Topics</p>
                    </div>
                    <TopicWrapper topics={topics}/>
                </div>}
            </div>
        </div>

    )
};

export default FeedAnswerPage;