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

    const { loading, error, data,client,refetch } = useQuery(GET_QUESTION,{ variables: { id },});

    if (loading) return <div/>;
    if (error) return <div/>;
    console.log(client);

    const {comments} = data.getQuestion;
    return (
        <div className="questionAnswerWrapper">
            <div className="questionAnswerContent">
                <div className="articleWrapper">
                    <ArticleCard question={(data.getQuestion)} refetch={refetch}/>
                </div>
                <div className="commentsWrapper">
                    {comments.map((comment) => (
                        <div>
                        <div className="articleComment">
                            <CommentCard comment={comment} clinet={client} refetch={refetch}/>
                        </div>
                            <div style={{width:"100%",borderBottom:"1px solid #BCBCBC"}}/>
                        </div>
                        )

                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;