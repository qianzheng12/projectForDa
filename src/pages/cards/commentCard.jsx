import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import {useVotesState} from "../hooks/answerStates";
import Truncate from 'react-truncate';
import Button from "@material-ui/core/Button";
import {useCommentState} from "../hooks/commentStates";
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import './commentCard.css'
import {useMutation} from "@apollo/react-hooks";
import {CREATE_REPLY} from "../graphQL/mutations";
import TimeAgo from "react-timeago";
import ReplyContent from "./replyContent";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReportWindow from "../utils/reportWindow";
const CommentCard = ({comment, refetch}) => {
    const replies = comment.replies;
    const {user} = comment;
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const [lineOfContent, setLineOfContent] = useState(5);
    const [repliesExpanded, setRepliesExpanded] = useState(false);
    const [createReply] = useMutation(CREATE_REPLY);
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError} = useCommentState();
    const [report, setReport] = useState(false);
    const sendReply = ()=>{
        createReply({ variables: { commentID:comment.id,content:commentContent,replyTo:null}}).then(
            () => {
                refetch();
                setRepliesExpanded(true);
                setCommentContent('');
                setCommentMode(false);

            }
        )
    };
    return (
        <div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={user.thumbnail||require('../../resource/ted.jpg')}/>
                <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2><TimeAgo date={comment.dateCommented} live={false} /></h2>

                    <h3>{user.school}</h3>
                </div>
                <div className="cardToolWrapper">
                    <MoreVertIcon onClick={()=>{setToolWindowOpen(!toolWindowOpen)}} className="cardToolIcon"/>
                    {toolWindowOpen &&
                    <div className="cardToolWindow">
                        <div onClick={()=>{setReport(true)}} className="topicToolWindowSubSection">
                            <p>Report</p>
                        </div>
                        {report && <ReportWindow user={user} closeWindow={() => {
                            setReport(false)
                        }}/>}
                    </div>}
                </div>
            </div>
            <div className="commentContent">
                <p>{comment.content}</p>
            </div>
            <div className="answerActions">
                <div className="thumbWrapper">
                    {!thumbUp && <ThumbUpAltOutlinedIcon onClick={toggleThumbUp}/>}
                    {thumbUp && <ThumbUpIcon onClick={toggleThumbUp} style={{color: "#FF9240"}}/>}
                    <span>{upVotes}</span>
                </div>
                {!thumbDown && <ThumbDownAltOutlinedIcon onClick={toggleThumbDown}/>}
                {thumbDown && <ThumbDownAltOutlinedIcon onClick={toggleThumbDown} style={{color: "#FF9240"}}/>}
                <div className="rightCommentActions">
                    <ReplyRoundedIcon onClick={()=>setCommentMode(!commentMode)}/>
                </div>
            </div>
            {commentMode &&
            <div className="commentInputArea">
                <input onChange={e=>setCommentContent(e.target.value)} placeholder="Write your comment"/>
                <Button onClick={sendReply}>
                    <span>{"Send"}</span>
                </Button>
                {emptyCommentError && <h2>Please enter comment before send.</h2>}
            </div>}
            {replies.length >0 &&
            <div className="repliesWrapper">
                {!repliesExpanded && <div className="expandRepliesButton">
                    <p onClick={()=>setRepliesExpanded(true)}>view all the replies</p>
                </div>}
                {repliesExpanded &&
                <div className="repliesContent">
                    {replies.map(reply => (
                        <ReplyContent commentId={comment.id} refetch={refetch} reply={reply}/>
                    ))}
                </div>}
            </div>}
        </div>
    );
};

export default CommentCard;