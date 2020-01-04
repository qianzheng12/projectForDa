import React from 'react'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import TimeAgo from "react-timeago/lib";
import {useCommentState} from "../hooks/commentStates";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_REPLY} from "../graphQL/mutations";
const ReplyContent = ({reply}) => {
    const [createReply] = useMutation(CREATE_REPLY);
    const {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError} = useCommentState();

    return (
        <div className="reply">
            <div className="replyHeader"> <h1>{reply.user.firstName + ' '+reply.user.lastName}</h1><h2><TimeAgo date={reply.dateReplied} live={false}/></h2></div>
            <div className="replyContent"> <pre><span>@{"Qian Zheng"}</span>  {reply.content}</pre></div>
            <div className="rightReplyActions">
                <ReplyRoundedIcon onClick={()=>setCommentMode(!commentMode)}/>
            </div>
            {commentMode &&
            <div className="commentInputArea">
                <input onChange={e=>setCommentContent(e.target.value)} placeholder="Write your comment"/>
                <Button>
                    <span>{"Send"}</span>
                </Button>
                {emptyCommentError && <h2>Please enter comment before send.</h2>}
            </div>}
        </div>
    );
};

export default ReplyContent;