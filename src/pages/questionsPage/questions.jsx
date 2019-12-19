import React from 'react'
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import QuestionCard from "../cards/questionCard";
import './questions.css';
import TopicWrapper from "../topic/topicWrapper";
import {FEED_QUESTIONS, GET_TOPICS} from "../graphQL/query";

const Questions = props => {
    const { loading, error, data,refetch } = useQuery(FEED_QUESTIONS);
    const getTopicsResult = useQuery(GET_TOPICS);
    if (loading) return <div></div>;
    if (error) return <div></div>;
    if (getTopicsResult.loading) return <div/>;
    if (getTopicsResult.error) return <div/>;
    const topics = getTopicsResult.data.topics;
    props.setSelectedPage("Questions");
    const {questions} = data;
    return (
        <div className="homePage">
            <div style={{marginLeft: "20vw"}} className="homePageContent">
                <div className="feedQuestions">
                    {questions.map((question)=>(
                        <div className="feedQuestion"><QuestionCard refetch={refetch} question={question} feedCard={true}/></div>
                        ))}
                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Topics</p>
                    </div>
                    <TopicWrapper topics={topics}/>
                </div>

            </div>
        </div>
    )
}

export default Questions;