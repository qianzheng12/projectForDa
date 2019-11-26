import React from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import './answerCard.css'

import {Link} from 'react-router-dom'
import {useVotesState} from "../hooks/answerStates";

const FeedAnswerCard = ({question}) => {
    console.log(question)
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const {user, answers} = question;
    const answer = answers[0];
    return (
        <div className="card">
            <div className="questionHeader">
                <span>{question.description}</span>
                <Link to={`/question/${question.id}`}><h3>{question.title}</h3></Link>

            </div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                { user &&
                    <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2>{question.lastUpdated}</h2>
                    <h3>{user.school}</h3>
                    </div>

                }
            </div>
            <div className="answerContents">
                {
                   answers.length>=1 &&
                   <Typography variant="body2" color="textSecondary" component="p">
                       {answer.content}
                   </Typography>
                }
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
                    <div className="commentsIconWrapper">
                        <Link to={`/question/${question.id}`}><TextsmsOutlinedIcon/></Link>
                        <span>{answer.comments.length}</span>
                    </div>
                    <ShareRoundedIcon/>
                    <BookmarkBorderOutlinedIcon/>
                </div>
            </div>

        </div>
    )
};
export default FeedAnswerCard;