import React, {useState} from 'react'
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatIcon from '@material-ui/icons/Chat';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CommentsCard from "./commentsCard";

const AnswerWithCommentsCard = ({answer}) => {
    const {user} = answer;
    const {comments} = answer;
    return (
        <div className="card">
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2>{answer.lastUpdated}</h2>
                    <h3>{user.school}</h3>
                </div>
            </div>
            <div className="answerContents">
                <Typography variant="body2" color="textSecondary" component="p">
                    {answer.content}
                </Typography>
            </div>
            <div className="answerActions">
                <IconButton aria-label="Thumb Up">
                    <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="Thumb Down">
                    <ThumbDownIcon/>
                </IconButton>

                <IconButton aria-label="comment">
                    <ChatIcon/>
                </IconButton>
                <IconButton aria-label="comment">
                    <ShareIcon/>
                </IconButton>
                <IconButton aria-label="comment">
                    <BookmarkIcon/>
                </IconButton>
            </div>
            {comments && (
                <div className="commentsForAnswer">
                    {comments.map(comment => (

                        <div className="comment">
                            <CommentsCard comments={comment}/>
                        </div>)
                    )}
                </div>
            )}
        </div>
    );
};

export default AnswerWithCommentsCard