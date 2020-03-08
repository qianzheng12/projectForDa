import React from "react";
import Typography from "@material-ui/core/Typography";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";

const ProfileQuestionCard = ({post,content,type}) => {
    const {user}=post;
    const link = type === "article" ? "/article/"+post.id : "/question/"+post.id;
    return (
        <div className="card">
            <div className="questionHeader">
                <div className="questionTopics">
                </div>
                <Link to={link}><h3>{post.title}</h3></Link>
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