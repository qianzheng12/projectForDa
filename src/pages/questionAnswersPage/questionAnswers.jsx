import React, {useEffect, useMemo, useState} from 'react'
import './questionAnswers.css'
import QuestionCard from "../cards/questionCard";
import {useQuery} from "@apollo/react-hooks";
import AnswerWithCommentsCard from "../cards/answerWithCommentsCard";
import SortMethodButton from "../sortButton/sortMethodButton";
import {GET_QUESTION} from "../graphQL/query";
const QuestionAnswers = props => {

    let id = props.match.params.id;
    let { loading, error, data,refetch} = useQuery(GET_QUESTION,{ variables: { id },});

    if (loading) return <div/>;
    if (error) return <div/>;

    const {getQuestion} = data;
    return (
        <div className="questionAnswerWrapper">
            <div className="questionAnswerContent">
                <div className="question">
                    <QuestionCard question={getQuestion} refetch={refetch} />
                </div>
                <div className="questionAnswerGap">
                    <p>
                        The question has {getQuestion.answers.length} answers
                    </p>
                    <SortMethodButton/>
                </div>
                <div className="answers">
                    {getQuestion.answers.map((answer) => (
                        <div className="answer">
                            <AnswerWithCommentsCard refetch={refetch} answer={answer}/>
                        </div>)
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswers;