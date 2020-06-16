import React from 'react'
import './TutorialPostCard.css'
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TimeAgo from "react-timeago";


const TutorialPostCard = ({setPopUpWindowType, post}) => {
    const { topics, title, fee, description, lastUpdated, user} = post;
    return (
        <div className="tutorialCard">
            <div className="tutorialTopics">
                {topics.map(topic => {
                    return (
                        <Link key={topic.id} to={"/topic/" + topic.id}><span>#{topic.name}</span></Link>)
                })}
            </div>
            <div className="tutorialPostHeader">
                <h1>{title}</h1>
                <div className="tutorialPriceTag">
                    {fee}
                </div>
            </div>
            <div className="tutorialPostDescription">
                <p>
                    {description}
                </p>
            </div>
            <div className="tutorialPostTime">
                {<TimeAgo date={lastUpdated} live={false}/>}
            </div>
            <div className="tutorialPostFooter">
                <div className="tutorialPostUser">
                    <img src={require('../../resource/ted.jpg')}/>
                    <div className="tutorialPostUserDetail">
                        <span>{`${user.firstName} ${user.lastName}`}</span>
                        <h2>{`${user.year} ${user.major}`}</h2>
                    </div>

                </div>
                <Button onClick={()=>setPopUpWindowType(post.id)}>Apply</Button>
            </div>
        </div>
    )
};
export default TutorialPostCard;