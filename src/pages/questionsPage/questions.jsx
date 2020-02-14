import React from 'react'
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import QuestionCard from "../cards/questionCard";
import './questions.css';
import TopicWrapper from "../topic/topicWrapper";
import {FEED_QUESTIONS, GET_TOPICS} from "../graphQL/query";
import FeedAnswerCard from "../cards/feedAnswerCard";

const Questions = ({setSelectedPage,followedQuestions,setGreyCover}) => {
    const { loading, error, data,refetch } = useQuery(FEED_QUESTIONS,{fetchPolicy: "network-only"});

    if (loading) return <div></div>;
    if (error) return <div></div>;
    setSelectedPage("Answer");
    const {questions,me:{followedTopics}} = data;
    return (
        <div className="homePage">
            <div style={{marginLeft: "20vw"}} className="homePageContent">
                <div className="feedQuestions">
                    {questions.map((question)=>(
                        <div className="feedQuestion"><QuestionCard refetch={refetch} question={question} feedCard={true} setGreyCover={setGreyCover}
                                                                    followed={followedQuestions.some((q)=>{return q.id === question.id})}/></div>
                        ))}
                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Topics</p>
                    </div>
                    <TopicWrapper topics={followedTopics}/>
                </div>

            </div>
        </div>
    )
}

export default Questions;