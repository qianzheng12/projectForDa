import React, {useState} from 'react'
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
import {useMutation} from "@apollo/react-hooks";
import {BOOKMARK_ANSWER, UN_BOOKMARK_ANSWER} from "../graphQL/userMutation";
import CloseIcon from '@material-ui/icons/Close';
import TimeAgo from 'react-timeago'
/*
                   <Typography variant="body2" color="textSecondary" >
                       <Truncate lines={lineOfContent} ellipsis={<span>...<h3 onClick={()=>setLineOfContent(-1)}> Read more</h3></span>}>
                            <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                       </Truncate>
                    </Typography>
                }
 */
const FeedAnswerCard = ({question, showAction, answer,profileBookmarkAnswer,refetch}) => {
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const [unBookmarkMutation] = useMutation(UN_BOOKMARK_ANSWER);
    const [lineOfContent, setLineOfContent] = useState(5);
    const {user} = answer;
    const [bookmarkAnswerMutation] = useMutation(BOOKMARK_ANSWER);
    console.log(answer);
    const unBookmarkAnswer = () => {
        unBookmarkMutation({variables: {answerID: answer.id}}).then ((result) => {
            refetch()
        })
    }
    const bookmarkAnswer = () => {
        bookmarkAnswerMutation({variables: {answerID: answer.id}}).then ((result) => {
        })
    };
    return (
        <div className="card">
            {profileBookmarkAnswer && <CloseIcon  className="askQuestionFormClose"  onClick={unBookmarkAnswer}/>}
            <div className="questionHeader">
                {question.topics &&
                <div className="questionTopics">
                    {question.topics.map( topic => {
                        return (<span>#{topic.name}</span>)
                    })}
                </div>}
                <span>{question.description}</span>
                <Link to={`/question/${question.id}`}><h3>{question.title}</h3></Link>

            </div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                { user &&
                    <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2><TimeAgo date={question.lastUpdated} live={false}/></h2>
                    <h3>{user.school}</h3>
                    </div>

                }
            </div>
            <div className="answerContents">
               <Typography variant="body2" color="textSecondary" >
                   <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                </Typography>
            </div>
            {showAction &&
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
                        <BookmarkBorderOutlinedIcon onClick={bookmarkAnswer}/>
                    </div>
                </div>
            }

        </div>
    )
};
export default FeedAnswerCard;