import React from 'react'
import {Link} from "react-router-dom";
import './TutoringApplicationContent.css'
const TutoringApplicationContent = ({tutorPost}) => {

    return (
        <div className="tutoringApplicationWrapper">
            <div className="tutoringApplicationHeader">
                <div className="tutorialTopics">
                    {tutorPost.topics.map(topic => {
                        return (
                            <Link key={topic.id} to={"/topic/" + topic.id}><span>#{topic.name}</span></Link>)
                    })}
                </div>
                <h1>{tutorPost.title}</h1>
                <p>
                    {tutorPost.description}
                </p>
            </div>

            <div className="tutoringApplicationBottomPart">
                <h2>Details: </h2>
                <div className="tutoringDetailItem">
                    <h3>Tutoring fee</h3>
                    <p> {tutorPost.fee}</p>
                </div>
                <div className="tutoringDetailItem">
                    <h3>Key concepts</h3>
                    <p>{tutorPost.keyConcepts}</p>
                </div>
                <div className="tutoringDetailItem">
                    <h3>Time availability:</h3>
                    <p>{tutorPost.timeAvailability}</p>
                </div>
                <div className="tutoringDetailItem">
                    <h3>Finish by</h3>
                    <p>{tutorPost.finishBy}</p>
                </div>
                <div className="tutoringDetailItem">
                    <h3>What software do you prefer?</h3>
                    <p>{tutorPost.preferredSoftware}</p>
                </div>
                <div className="tutoringDetailItem">
                    <h3>Will you provide any materials?</h3>
                    <p>{tutorPost.materials? "Yes" : "No"}</p>
                </div>
            </div>

        </div>
    )
};

export default TutoringApplicationContent;