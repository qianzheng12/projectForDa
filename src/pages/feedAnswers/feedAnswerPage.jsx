import React, {useEffect, useState} from 'react'
import './feedAnswerPage.css'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "../topic/topicWrapper";
import {useQuery} from '@apollo/react-hooks';
import ImageUploader from 'react-images-upload';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {GET_FEED_ANSWERS} from '../graphQL/query'

const FeedAnswerPage = ({setSelectedPage,bookMarkedAnswers}) => {
    const {loading, error, data} = useQuery(GET_FEED_ANSWERS,{fetchPolicy: "network-only"});
    const [leftMargin, setLeftMargin] = useState("20vw");
    const [showTopic, toggleShowTopic] = useState(true);
    setSelectedPage("Home");
    if (loading) return <div/>;
    if (error) return <div/>;
    console.log(data);
    const {questions,me:{followedTopics}} = data;

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
                    <TopicWrapper topics={followedTopics}/>
                </div>}
            </div>
        </div>

    )
};

export default FeedAnswerPage;