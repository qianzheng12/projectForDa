import React, {useState} from 'react'
import './TutorialPostCard.css'
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TimeAgo from "react-timeago";


const TutorialPostCard = ({setPopUpWindowType, post, myPost, setPopUpCallBackFunction}) => {
    const {topics, title, fee, description, lastUpdated, user} = post;
    const [applied, setApplied] = useState(post.applied);
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
                    <Link to={"/Profile/" + user.id}>
                        <img src={user.thumbnail || require('../../resource/ted.jpg')}/></Link>
                    <div className="tutorialPostUserDetail">
                        <Link to={"/Profile/" + user.id}><span>{`${user.firstName} ${user.lastName}`}</span></Link>
                        <h2 id="education">{`${user.year} ${user.major}`}</h2>
                    </div>

                </div>
                {!myPost && <Button onClick={
                    () => {
                        setPopUpCallBackFunction(() => () => setApplied(true));
                        setPopUpWindowType(post)
                    }
                } disabled={applied}> Apply</Button>}
            </div>
        </div>
    )
};
export default TutorialPostCard;