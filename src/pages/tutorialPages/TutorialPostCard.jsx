import React from 'react'
import './TutorialPostCard.css'
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


const mockTopics = [{id:"1",name:"topic1"},{id:"3",name:"topic3"},{id:"5",name:"topic5"}]
const TutorialPostCard = () => {

    return (
        <div className="tutorialCard">
            <div className="tutorialTopics">
                {mockTopics.map(topic => {
                    return (
                        <Link key={topic.id} to={"/topic/" + topic.id}><span>#{topic.name}</span></Link>)
                })}
            </div>
            <div className="tutorialPostHeader">
                <h1>Tutoring Topic</h1>
                <div className="tutorialPriceTag">
                    $30
                </div>
            </div>
            <div className="tutorialPostDescription">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
                </p>
            </div>
            <div className="tutorialPostTime">
                2 hours
            </div>
            <div className="tutorialPostFooter">
                <div className="tutorialPostUser">
                    <img src={require('../../resource/ted.jpg')}/>
                    <div className="tutorialPostUserDetail">
                        <span>Chris Chen</span>
                        <h2>1st year, Mathmatics </h2>
                    </div>

                </div>
                <Button>Apply</Button>
            </div>
        </div>
    )
};
export default TutorialPostCard;