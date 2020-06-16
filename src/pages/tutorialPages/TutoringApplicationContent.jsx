import React from 'react'
import {Link} from "react-router-dom";
import './TutoringApplicationContent.css'
const mockTopics = [{id:"1",name:"topic1"},{id:"3",name:"topic3"},{id:"5",name:"topic5"}]
const TutoringApplicationContent = () => {

    return (
        <div className="tutoringApplicationWrapper">
            <div className="tutoringApplicationHeader">
                <div className="tutorialTopics">
                    {mockTopics.map(topic => {
                        return (
                            <Link key={topic.id} to={"/topic/" + topic.id}><span>#{topic.name}</span></Link>)
                    })}
                </div>
                <h1>Great!</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
                </p>
            </div>

            <h2>Details: </h2>
            <div className="tutoringDetailItem">
                <h1>Tutoring fee</h1>
                <p>$20-$30</p>
            </div>
            <div className="tutoringDetailItem">
                <h1>Key concepts</h1>
                <p>Markov jump process; continues process</p>
            </div>
            <div className="tutoringDetailItem">
                <h1>Time availablity:</h1>
                <p>can do 1800 to 2200 for every working day
                    and 1200 to 2200 for weekends.</p>
            </div>
            <div className="tutoringDetailItem">
                <h1>Finish by</h1>
                <p>2020.7.2</p>
            </div>
            <div className="tutoringDetailItem">
                <h1>What software do you prefer?</h1>
                <p>Skype</p>
            </div>
            <div className="tutoringDetailItem">
                <h1>Will you provide any materials?</h1>
                <p>Yes</p>
            </div>
        </div>
    )
}

export default TutoringApplicationContent;