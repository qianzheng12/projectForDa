import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import CommentCard from "./commentCard";
import './answerCard.css'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import {useVotesState} from '../hooks/answerStates'
import {useCommentState} from "../hooks/commentStates";
import Button from "@material-ui/core/Button";
import {SEND_COMMENT} from "../graphQL/mutations";
import {useMutation} from "@apollo/react-hooks";
import Truncate from "react-truncate";
const AnswerWithCommentsCard = ({answer,refetch}) => {
    const {user} = answer;
    const {comments} = answer;
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError} = useCommentState();
    const [sendCommentMutation] = useMutation(SEND_COMMENT);
    const [lineOfContent, setLineOfContent] = useState(5);
    const sendComment = () => {
        if (commentContent === ''){
            setEmptyCommentError(true)
        }
        else{
            sendCommentMutation({ variables: { answerId:answer.id,commentContent}}).then(
                (result)=>{
                    refetch()
                }
            );
            setEmptyCommentError(false);
            setCommentMode(false);
        }
    };
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
                <Typography variant="body2" color="textSecondary" >
                        <div dangerouslySetInnerHTML={{ __html: answer.content }} />
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
                    <div className="commentsIconWrapper">
                        <AddCommentOutlinedIcon onClick={()=>setCommentMode(!commentMode)}/>
                        <span>{answer.comments.length}</span>
                    </div>
                    <ShareRoundedIcon/>
                    <BookmarkBorderOutlinedIcon/>
                </div>
            </div>
            {commentMode &&
            <div className="commentInputArea">
                <input onChange={e=>setCommentContent(e.target.value)} placeholder="Write your comment"/>
                <Button onClick={sendComment}>
                    <span>{"Send"}</span>
                </Button>
                {emptyCommentError && <h2>Please enter comment before send.</h2>}
            </div>}
            <div className="dividerBetweenAnswerAndComments"/>
            {comments&&comments.length>=1 && (
                <div className="commentsForAnswer">
                    {comments.map(comment => (

                        <div className="comment">
                            <CommentCard comment={comment} refetch={refetch}/>
                        </div>)
                    )}
                </div>
            )}
        </div>
    );
};

export default AnswerWithCommentsCard