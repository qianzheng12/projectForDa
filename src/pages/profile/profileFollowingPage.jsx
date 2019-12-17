
import React from "react";
import './profileFollowing.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import FeedAnswerCard from "../cards/feedAnswerCard";
const ProfileFollowingPage = props => {
    const users = [{name:"Chris Chen", Major:"Mathematics", Degree:"undergraduate"},
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
                {users.map( user => (
                    <div className="followingContent">
                        <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                        <div className="followingPeopleIntro">
                            <h1>{user.name}</h1>
                            <p>{user.Major}</p>
                            <p>{user.Degree}</p>
                        </div>
                        <HowToRegIcon/>
                    </div>
                ))
                }
            </div>
        </div>
    )
};
export default ProfileFollowingPage;