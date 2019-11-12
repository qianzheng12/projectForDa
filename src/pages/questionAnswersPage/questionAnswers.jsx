import React, {useState} from 'react'
import './questionAnswers.css'
import QuestionCard from "../cards/questionCard";
import {useQuery} from "@apollo/react-hooks";
import AnswerWithCommentsCard from "../cards/answerWithCommentsCard";
import SortMethodButton from "../sortButton/sortMethodButton";
import {GET_QUESTION} from "../graphQL/query";
const QuestionAnswers = () => {
    const { loading, error, data } = useQuery(GET_QUESTION,{ variables: { id:"012c8e9e-68ec-4992-95e1-0c57803468e7" },});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :({error})</p>;
    console.log(data)
    const {answers} = data.getQuestion
    ;
    return (
        <div className="questionAnswerWrapper">
            <div className="questionAnswerContent">
                <div className="question">
                    <QuestionCard question={(data.getQuestion)}/>
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
        </div>
    );
};

export default QuestionAnswers;