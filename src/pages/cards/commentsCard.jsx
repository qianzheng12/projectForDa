import React from 'react'
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import {useVotesState} from "../hooks/answerStates";

const CommentsCard = ({comments}) => {
    const {user} = comments;
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
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
                <div className="thumbWrapper">
                    {!thumbUp && <ThumbUpAltOutlinedIcon onClick={toggleThumbUp}/>}
                    {thumbUp && <ThumbUpIcon onClick={toggleThumbUp} style={{color: "#FF9240"}}/>}
                    <span>{upVotes}</span>
                </div>
                {!thumbDown && <ThumbDownAltOutlinedIcon onClick={toggleThumbDown}/>}
                {thumbDown && <ThumbDownAltOutlinedIcon onClick={toggleThumbDown} style={{color: "#FF9240"}}/>}
                <div className="rightAnswerActions">

                </div>
            </div>
        </div>
    );
};

export default CommentsCard;