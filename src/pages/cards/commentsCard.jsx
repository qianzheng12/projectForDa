import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatIcon from '@material-ui/icons/Chat';

const CommentsCard = ({comments}) => {
    const {user} = comments;
    return (
        <div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2>{comments.lastUpdated}</h2>
                </div>
            </div>
            <div className="commentContent">
                <Typography variant="body2" color="textSecondary" component="p">
                    {comments.content}
                </Typography>
            </div>
            <div className="answerActions">
                <IconButton aria-label="Thumb Up">
                    <ThumbUpIcon/>
                </IconButton>
                <IconButton aria-label="Thumb Down">
                    <ThumbDownIcon/>
                </IconButton>

                <IconButton aria-label="comment">
                    <ChatIcon/>
                </IconButton>
            </div>
        </div>
    );
};

export default CommentsCard;