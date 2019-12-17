import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";

const ProfileQuestionCard = props => {
    const {question} = props;
    const {user} = question;
    console.log(question)
    return (
        <div className="card">
            <div className="questionHeader">
                <div className="questionTopics">
                    {question.topics.map( topic => {
                        return (<span>#{topic.name}</span>)
                    })}
                </div>
                <h3>{question.title}</h3>
                {user&&<div><p>post on</p> </div>}
                <p style={{marginLeft:'0.5%'}}>{question.lastUpdated}</p>
            </div>
            <div className="questionDescription">
                <Typography variant="body2" color="textSecondary">
                    <div dangerouslySetInnerHTML={{ __html: question.description} } />
                </Typography>
            </div>
        </div>
    )
};
export default ProfileQuestionCard;