import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatIcon from '@material-ui/icons/Chat';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {Link} from 'react-router-dom'
const FeedAnswerCard = ({question}) => {
    const [thumbUpColor, setThumbUpColor] = useState();
    const thumbUp = () => {
        const color = thumbUpColor === 'secondary' ? undefined : 'secondary';
        setThumbUpColor(color);
    };
    const {user,answers} = question;
    return (
        <div className="card">
            <div className="questionHeader">
                <span>{question.description}</span>
                <Link to='/questions/1'> <h3>{question.title}</h3></Link>

            </div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2>{question.lastUpdated}</h2>
                    <h3>{user.school}</h3>
                </div>
            </div>
            <div className="answerContents">
                <Typography variant="body2" color="textSecondary" component="p">
                    {answers[0].content}
                </Typography>
            </div>
            <div className="answerActions">
                <IconButton onClick={thumbUp} aria-label="Thumb Up">
                    <ThumbUpIcon color={thumbUpColor}/>
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
        </div>
    )
};
export default FeedAnswerCard;