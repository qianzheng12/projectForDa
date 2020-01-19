
import React from "react";
import './profileFollowing.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import FeedAnswerCard from "../cards/feedAnswerCard";
import {useQuery} from "@apollo/react-hooks";
import {USER_FOLLOWED_TOPICS, USER_FOLLOWED_USERS} from "../graphQL/userQuery";
const ProfileFollowingPage = props => {
    const {loading,error,data}= useQuery(USER_FOLLOWED_USERS,{fetchPolicy: "network-only"});
    if(loading){return <div/>}
    if(error){return <div/>}
    console.log(data)
    const {me} = data;
    const {followedUsers:users} = me;
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
                            <h1>{`${user.firstName} ${user.lastName}`}</h1>
                            <p>{user.major}</p>
                            <p>{user.year}</p>
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