import React from 'react'
import FeedAnswerCard from "../cards/feedAnswerCard";
import {useQuery} from "@apollo/react-hooks";
import {GET_QUESTION_BY_TOPIC} from "../graphQL/topicQuery";


const TopicQuestions = ({topic}) => {
    const {loading,data} = useQuery(GET_QUESTION_BY_TOPIC,{
        variables:{topicName:topic.name},fetchPolicy: "network-only"});
    if(loading) return <div/>;
    const {questions} = data;
    return (
        <div>
        {questions.map(question => {
                if(question.answers.length >= 1){
                    return (
                        <div className="feedAnswer">
                            <FeedAnswerCard key={question.id} answer={(question.answers)[0]} question={question}/>
                        </div>
                    )
                }
                return null;
            })}
        </div>
    )
};

export default TopicQuestions;