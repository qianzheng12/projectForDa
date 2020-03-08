
import React, {useEffect, useState} from "react";
import './profileFollowing.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {useLazyQuery} from "@apollo/react-hooks";
import {USER_FOLLOWED_USERS} from "../graphQL/userQuery";
const ProfileFollowingPage = () => {
    const [users,setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [followingQuery,{data}]= useLazyQuery(USER_FOLLOWED_USERS,{
        fetchPolicy: "network-only",
    onCompleted:()=>{
        const {me:{followedUsers}} = data;
        setUsers(followedUsers);
    }});

    useEffect(()=>{
        followingQuery();
    },[]);

    const search = (input) => {
        const {me} = data;
        setSearchInput(input);
        const updatedUser = me.followedUsers.filter(user=>((`${user.firstName} ${user.lastName}`).includes(input)));
        setUsers(updatedUser);
    };
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input value={searchInput} onChange={e=>search(e.target.value)} placeholder="search"/>
            </div>

            <div className="profileRightPartContent">
                {users.map( user => (
                    <div className="followingContent">
                        <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                        <div className="followingPeopleIntro">
                            <a href={"/Profile/" + user.id}><h1>{`${user.firstName} ${user.lastName}`}</h1></a>
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