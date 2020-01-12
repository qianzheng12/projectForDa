
import React, {useState} from "react";
import './profileFollowing.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {MY_FOLLOW_TOPICS, TOPIC_PAGE_QUERY} from "../graphQL/topicQuery";
import {UN_FOLLOW_TOPIC} from "../graphQL/topicMutation";
import {USER_FOLLOWED_TOPICS} from "../graphQL/userQuery";
const ProfileFollowingTopic = () => {
    const {loading,error,data}= useQuery(USER_FOLLOWED_TOPICS,{fetchPolicy: "network-only"});

    if(loading) return <div/>;
    if(error) return <div/>;
    const {followedTopics} = data.me;

    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input placeholder="search"/>
            </div>

            <TopicsWrapper followedTopics={followedTopics}/>
        </div>
    );


};
const TopicsWrapper = ({followedTopics}) =>{
    const [unFollowTopicMutation] = useMutation(UN_FOLLOW_TOPIC);
    const [topics, setTopics] = useState(followedTopics)
    const unFollow = (topicId) =>{
        unFollowTopicMutation({variables:{topicID:topicId}}).then(result=>{
            if(!result.data.unFollowTopic){
                alert("something went wrong");
            }
            else{
                const newFollowedTopics = topics.filter(topic => {
                    return topic.id !== topicId
                })
                setTopics(newFollowedTopics);
            }
        })
    };
    return (
        <div className="profileRightPartContent">
            {topics.map( topic => (
                <div key={topic.id} className="followingContent">
                    <img height="40px" width="50px" src={topic.thumbnail||require('../../resource/topic.svg')}/>
                    <div className="followingTopicName">
                        <h1>#{topic.name}</h1>
                    </div>
                    <DeleteOutlineOutlinedIcon onClick={()=>{unFollow(topic.id)}}/>
                </div>
            ))
            }
        </div>
    )
}
export default ProfileFollowingTopic;