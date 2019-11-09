import React from 'react'
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import QuestionCard from "../cards/questionCard";
import './questions.css';
const FEED_QUESTIONS = gql`
    {
        questions {
            title
            answers {
                content
                user {
                    id
                    firstName
                    lastName
                    school

                }
                lastUpdated
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
const mockQuestions = [{title:"My friend is stupid", answers:[{content:"You have to kill him",user:{id:"zhengda",firstName:"Qian",lastName:"Zheng",school:"Imperial College"}}],
    description:"He keep being stupid and act like idiot",lastUpdate:"two days ago",user:{id:"zhengda",firstName:"Da",lastName:"Zheng",school:"Imperial College"}}];
const Questions = () => {
    const { loading, error, data } = useQuery(FEED_QUESTIONS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :({error})</p>;
    const questions = mockQuestions;
    return (
        <div className="questionsPageWrapper">
            <div className="feedQuestions">
                {questions.map((question)=>(
                    <div className="feedQuestion"><QuestionCard question={question}/></div>
                    ))}
            </div>
        </div>
    )
}

export default Questions;