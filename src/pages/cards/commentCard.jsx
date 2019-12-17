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
const CommentCard = ({comment, refetch}) => {
    const replies = comment.replies;
    const {user} = comment;
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const [lineOfContent, setLineOfContent] = useState(5);
    const [repliesExpanded, setRepliesExpanded] = useState(false);
    const [createReply] = useMutation(CREATE_REPLY);
    const {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError} = useCommentState();
    const sendReply = ()=>{
        createReply({ variables: { commentID:comment.id,content:commentContent}}).then(
            () => {
                setRepliesExpanded(false);
                refetch()
            }
        )
    }
    console.log(comment);
    return (
        <div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2>{comment.lastUpdated}</h2>
                </div>
            </div>
            <div className="commentContent">
                <Typography variant="body2" color="textSecondary" component="p">
                    <Truncate lines={lineOfContent} ellipsis={<span>...<h3 onClick={()=>setLineOfContent(-1)}> Read more</h3></span>}>
                        {comment.content}
                    </Truncate>
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
                        <div className="reply">
                            <div className="replyHeader"> <h1>{reply.user.firstName + ' '+reply.user.lastName}</h1><h2>{reply.date}</h2></div>
                            <div className="replyContent"> <pre><span>@{"Qian Zheng"}</span>  {reply.content}</pre></div>
                        </div>
                    ))}
                </div>}
            </div>}
        </div>
    );
};

export default CommentCard;