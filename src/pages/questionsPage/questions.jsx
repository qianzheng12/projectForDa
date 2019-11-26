import React from 'react'
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import QuestionCard from "../cards/questionCard";
import './questions.css';
import TopicWrapper from "../homePage/topicWrapper";
import {FEED_QUESTIONS} from "../graphQL/query";

const Questions = props => {
    const { loading, error, data } = useQuery(FEED_QUESTIONS);
    if (loading) return <div></div>;
    if (error) return <div></div>;
    console.log(data)
    props.setSelectedPage("Questions");
    const {questions} = data;
    return (
        <div className="homePage">
            <div style={{marginLeft: "20vw"}} className="homePageContent">
                <div className="feedQuestions">
                    {questions.map((question)=>(
                        <div className="feedQuestion"><QuestionCard question={question}/></div>
                        ))}
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
}

export default Questions;