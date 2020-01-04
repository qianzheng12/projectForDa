import React, {useState} from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import './answerCard.css'

import {Link} from 'react-router-dom'
import {useVotesState} from "../hooks/answerStates";
import {useMutation} from "@apollo/react-hooks";
import {BOOKMARK_ANSWER, UN_BOOKMARK_ANSWER} from "../graphQL/userMutation";
import CloseIcon from '@material-ui/icons/Close';
import TimeAgo from 'react-timeago'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import SharePopup from "../utils/sharePopup";
import Truncate from 'react-truncate'
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

/*
                   <Typography variant="body2" color="textSecondary" >
                       <Truncate lines={lineOfContent} ellipsis={<span>...<h3 onClick={()=>setLineOfContent(-1)}> Read more</h3></span>}>
                            <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                       </Truncate>
                    </Typography>
                }
 */
const FeedAnswerCard = ({question, showAction, answer,profileBookmarkAnswer, bookmarked}) => {
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const [share, setShare] = useState(false);
    const [bookmarkedIcon, setBookmarkedIcon] = useState(bookmarked)
    const [unBookmarkMutation] = useMutation(UN_BOOKMARK_ANSWER);
    const [lineOfContent, setLineOfContent] = useState(5);
    const {user} = answer;
    const [postExpanded,setExpanded] = useState(false);
    const [bookmarkAnswerMutation] = useMutation(BOOKMARK_ANSWER);

    const unBookmarkAnswer = () => {
        unBookmarkMutation({variables: {answerID: answer.id}}).then ((result) => {
            setBookmarkedIcon(false)
        })
    };
    const bookmarkAnswer = () => {
        bookmarkAnswerMutation({variables: {answerID: answer.id}}).then ((result) => {
            setBookmarkedIcon(true)
        })
    };
    const expand = ()=>{
        setExpanded(true);
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

                { user &&
                    <div>
                <a href={"/Profile/"+ user.id}><img height="40px" width="50px" src={(user&&user.thumbnail)||require('../../resource/ted.jpg')}/></a>
                    <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2><TimeAgo date={question.lastUpdated} live={false}/></h2>
                    <h3>{user.school}</h3>
                    </div></div>

                }
            </div>
            <div className="answerContents">
               <Typography variant="body2" color="textSecondary" >
                   {postExpanded && <div>{ReactHtmlParser(answer.content)}</div>}
                   {!postExpanded &&<HTMLEllipsis onClick={expand} unsafeHTML={answer.content} maxLine ='5' basedOn='letters' expand={expand} ellipsisHTML='...<a id="expandPostButton"> (expand)</a>'/>}
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
                         <ShareRoundedIcon onClick={()=>{setShare(!share)}}/>
                        {share && <SharePopup url={window.location.href +"question/"+question.id}/>}
                        {bookmarkedIcon && <BookmarkRoundedIcon onClick={unBookmarkAnswer} style={{color:"#FF9240"}}/>}
                        {!bookmarkedIcon && <BookmarkBorderOutlinedIcon onClick={bookmarkAnswer} />}
                    </div>
                </div>
            }

        </div>
    )
};
export default FeedAnswerCard;