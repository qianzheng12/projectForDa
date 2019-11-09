import React from 'react'
import './homePage.css'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "./topicWrapper";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
const FEED_QUESTIONS = gql`
    {
        questions {
            title
            answers{
                content
            }
            description
            lastUpdated
            user {
                id
                firstName
                lastName
                school

            }
        }
    }
`;

const mockQuestions = [{title:"My friend is stupid", answers:[{content:"You have to kill him"}],
    description:"He keep being stupid and act like idiot",lastUpdate:"two days ago",user:{id:"zhengda",firstName:"Da",lastName:"Zheng",school:"Imperial College"}},
    {title:"My teacher is stupid", answers:[{content:"You have to love him"}],
        description:"He keep being stupid and act like idiot",lastUpdate:"two days ago",user:{id:"zhengda",firstName:"Da",lastName:"Zheng",school:"Imperial College"}},
    {title:"My brother is stupid", answers:[{content:"You have to tell him that he is so stupid"}],
        description:"He keep being stupid and act like idiot",lastUpdate:"two days ago",user:{id:"zhengda",firstName:"Da",lastName:"Zheng",school:"Imperial College"}}];
const Home = () => {
    const { loading, error, data } = useQuery(FEED_QUESTIONS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :({error})</p>;
    console.log(data);
    const questions = mockQuestions;
    return(
        <div className="homePage">
            <div className="feedAnswers">
                {questions.map(question=>{
                    return (
                        <div className="feedAnswer">
                            <FeedAnswerCard key={question.id} question={question}/>
                        </div>
                    )
                })}
            </div>
            <div className="topics">
                <div className="topicHeader">
                    <p>Topics</p>
                </div>
                <TopicWrapper/>
            </div>
        </div>

    )
};

export default Home;