import React from 'react'
import './topicCard.css'
const TopicCard = ({topicName}) => {


    return (
        <div className="card">
            <div className="topicLeftDiv">
                <img width="120px" height="120px" src={require('../../resource/meepo.jpg')}/>
            </div>

            <div className="topicRightDiv">
                <h1>#{topicName}</h1>
                <div className="topicDescription">
                    <p> This is a mock topic description because I have no idea where to add the description
                        This is a mock topic description because I have no idea where to add the description
                        This is a mock topic description because I have no idea where to add the description
                        This is a mock topic description because I have no idea where to add the description</p>
                </div>
            </div>
        </div>
    );
};


export default TopicCard;