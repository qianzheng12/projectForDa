import React, {useEffect, useState} from 'react'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "../homePage/topicWrapper";
import './topicPage.css'
import {useQuery} from "@apollo/react-hooks";
import {GET_FEED_ANSWERS, QUESTIONS_BY_TOPIC} from "../graphQL/query";
import TopicCard from "../cards/topicCard";
const TopicPage = props => {
    const topicName = props.match.params.topicName;
    const {loading, error, data} = useQuery(QUESTIONS_BY_TOPIC,{ variables: { topicName }});
    if (loading) return <div/>;
    if (error) return <div/>;
    console.log(data);
    const {questions} = data
    return (
        <div className="topicPageWrapper">
            <div className="homePageContent" style={{marginLeft: "20vw"}}>
                <div className="topicRelevantQuestion">
                    <div className="topicCard">
                        <TopicCard topicName={topicName}/>
                    </div>
                    {questions.map(question => {
                        if(question.answers.length >= 1){
                            return (
                                <div className="feedAnswer">
                                    <FeedAnswerCard key={question.id} question={question}/>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>

                <div className="topics">
                    <div className="topicHeader">
                        <p>Topics</p>
                    </div>
                    <TopicWrapper/>
                </div>
            </div>

        </div>
    )
};

export default TopicPage