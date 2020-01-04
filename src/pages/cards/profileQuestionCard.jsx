import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TimeAgo from "react-timeago";

const ProfileQuestionCard = ({post,content}) => {
    console.log(post)
    const {user}=post
    return (
        <div className="card">
            <div className="questionHeader">
                <div className="questionTopics">
                    {post.topics.map( topic => {
                        return (<span>#{topic.name}</span>)
                    })}
                </div>
                <h3>{post.title}</h3>
                {user &&<div><p>{user.firstName+user.lastName} post on</p> </div>}
                <p style={{marginLeft:'0.5%'}}><TimeAgo date={post.lastUpdated} live={false}/></p>
            </div>
            <div className="questionDescription">
                <Typography variant="body2" color="textSecondary">
                    <div dangerouslySetInnerHTML={{ __html: content} } />
                </Typography>
            </div>
        </div>
    )
};
export default ProfileQuestionCard;