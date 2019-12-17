
import React from "react";
import './profileFollowing.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
const ProfileFollowingTopic = props => {
    const topics = [{name:"Chris Chen", Major:"Mathematics", Degree:"undergraduate"},
        {name:"Chris Chen", Major:"Mathematics", Degree:"undergraduate"},
        {name:"Chris Chen", Major:"Mathematics", Degree:"undergraduate"},
        {name:"Chris Chen", Major:"Mathematics", Degree:"undergraduate"},
        {name:"Chris Chen", Major:"Mathematics", Degree:"undergraduate"},
        {name:"Chris Chen", Major:"Mathematics", Degree:"undergraduate"}];
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input placeholder="search"/>
            </div>

            <div className="profileRightPartContent">
                {topics.map( topic => (
                    <div className="followingContent">
                        <img height="40px" width="50px" src={require('../../resource/topic.svg')}/>
                        <div className="followingTopicName">
                            <h1>#{topic.name}</h1>
                        </div>
                        <DeleteOutlineOutlinedIcon/>
                    </div>
                ))
                }
            </div>
        </div>
    )
};
export default ProfileFollowingTopic;