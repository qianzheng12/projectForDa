import React, {useState} from 'react'
import './questionAnswers.css'
import QuestionCard from "../cards/questionCard";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import AnswerWithCommentsCard from "../cards/answerWithCommentsCard";
import Button from '@material-ui/core/Button';
import SortMethodButton from "../sortButton/sortMethodButton";
export const FEED_QUESTIONS = gql`
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
                comments{
                    user {
                        id
                        firstName
                        lastName
                    }
                    content
                }
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
const QuestionAnswers = () => {
    const { loading, error, data } = useQuery(FEED_QUESTIONS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :({error})</p>;
    console.log(data)
    const {answers} = data.questions[0];
    return (
        <div className="questionAnswerWrapper">
            <div className="question">
                <QuestionCard question={(data.questions)[0]}/>
            </div>
            <div className="questionAnswerGap">
                <p>
                    The question has {answers.length} answers
                </p>
                <SortMethodButton/>
            </div>
            <div className="answers">
                {answers.map((answer) => (
                    <div className="answer">
                        <AnswerWithCommentsCard answer={answer}/>
                    </div>)
                )}
            </div>
        </div>
    );
};

export default QuestionAnswers;