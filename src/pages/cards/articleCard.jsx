import React, {useState} from 'react'
import Typography from "@material-ui/core/Typography";
import {ANSWER_QUESTION, SEND_COMMENT} from "../graphQL/mutations";
import {useMutation} from "@apollo/react-hooks";import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Truncate from "react-truncate";
import {Link} from "react-router-dom";
import {useVotesState} from "../hooks/answerStates";
import './articleCard.css'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import Button from "@material-ui/core/Button";
import {useCommentState} from "../hooks/commentStates";
const ArticleCard = ({question}) => {
    const {user} = question;
    console.log(question)
    const [answerMode,toggleAnswerButton] = useState(false);
    const [editorState, setEditorState] = useState("");
    const [answerQuestion] = useMutation(ANSWER_QUESTION);
    const [showWarning, setShowWarning] = useState(false);
    const [lineOfContent, setLineOfContent] = useState(5);
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState();
    const {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError} = useCommentState();

    const [sendCommentMutation] = useMutation(SEND_COMMENT);

    return (
        <div className="card">
            <div className="questionHeader">
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
            <div className="articleContent">
                <Typography variant="body2" color="textSecondary" component="p">
                    <Truncate lines={lineOfContent} ellipsis={<span>...<h3 onClick={()=>setLineOfContent(-1)}> Read more</h3></span>}>
                        <div dangerouslySetInnerHTML={{ __html: question.description} } />
                    </Truncate>
                </Typography>
            </div>
            <div className="articleTopicWrapper">
                Topics: {question.topics.map( topic => {
                    return (<span>#{topic.name}</span>)
                })}
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
                        <span>{10}</span>
                    </div>
                    <ShareRoundedIcon/>
                    <BookmarkBorderOutlinedIcon/>
                </div>
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


export default ArticleCard;