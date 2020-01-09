import React, {useState} from 'react'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import TimeAgo from "react-timeago/lib";
import {useCommentState} from "../hooks/commentStates";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_REPLY} from "../graphQL/mutations";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import {useVotesState} from "../hooks/answerStates";
import ReportWindow from "../utils/reportWindow";
const ReplyContent = ({reply,refetch,commentId}) => {
    const [createReply] = useMutation(CREATE_REPLY);
    const {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError} = useCommentState();
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const {replyTo,comment} = reply;
    const [report, setReport] = useState(false);
    const replyToReplies = () =>{
        createReply({ variables: { commentID:commentId,content:commentContent,replyTo:reply.id}}).then(
            () => {
                setCommentContent('');
                setCommentMode(false);
                refetch()
            }
        )
    };
    return (
        <div className="reply">
            {report && <ReportWindow user={reply.user} closeWindow={() => {
                setReport(false)
            }}/>}
            <div className="replyHeader">
                <h1>{reply.user.firstName + ' '+reply.user.lastName}</h1>
                <h2><TimeAgo date={reply.dateReplied} live={false}/></h2>
                <div className="cardToolWrapper">
                    <MoreVertIcon onClick={()=>{setToolWindowOpen(!toolWindowOpen)}} className="cardToolIcon"/>
                    {toolWindowOpen &&
                    <div className="cardToolWindow">
                        <div onClick={setReport} className="topicToolWindowSubSection">
                            <p>Report</p>
                        </div>

                    </div>}

                </div>
            </div>
            <div className="replyContent"> <p><span>@{replyTo?(replyTo.user.firstName+' '+replyTo.user.lastName)
                :(comment.user.firstName+' '+comment.user.lastName)}</span>  {reply.content}</p></div>
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
                <Button onClick={replyToReplies}>
                    <span>{"Send"}</span>
                </Button>
                {emptyCommentError && <h2>Please enter comment before send.</h2>}
            </div>}
        </div>
    );
};

export default ReplyContent;