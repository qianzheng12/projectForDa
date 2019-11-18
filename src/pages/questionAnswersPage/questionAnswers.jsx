import React, {useEffect, useState} from 'react'
import './questionAnswers.css'
import QuestionCard from "../cards/questionCard";
import {useQuery} from "@apollo/react-hooks";
import AnswerWithCommentsCard from "../cards/answerWithCommentsCard";
import SortMethodButton from "../sortButton/sortMethodButton";
import {GET_QUESTION} from "../graphQL/query";
const QuestionAnswers = props => {
    let id = props.match.params.id;
    const { loading, error, data } = useQuery(GET_QUESTION,{ variables: { id:id },});
    if (loading) return <div/>;
    if (error) return <div/>;
    const {answers} = data.getQuestion;
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