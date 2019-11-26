import React from 'react'
import QuestionCard from "../cards/questionCard";
import {useQuery} from "@apollo/react-hooks";
import AnswerWithCommentsCard from "../cards/answerWithCommentsCard";
import SortMethodButton from "../sortButton/sortMethodButton";
import {GET_QUESTION} from "../graphQL/query";
import ArticleCard from "../cards/articleCard";
import './articlePage.css';
import CommentCard from "../cards/commentCard";
const ArticlePage = props => {
    let id = props.match.params.id;

    const { loading, error, data,client } = useQuery(GET_QUESTION,{ variables: { id },});

    if (loading) return <div/>;
    if (error) return <div/>;
    console.log(client);

    const {answers} = data.getQuestion;
    return (
        <div className="questionAnswerWrapper">
            <div className="questionAnswerContent">
                <div className="articleWrapper">
                    <ArticleCard question={(data.getQuestion)}/>
                </div>
                <div className="commentsWrapper">
                    {answers.map((answer) => (
                        <div className="answer">
                            <CommentCard comment={answer.comments[0]} clinet={client}/>
                        </div>)
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;