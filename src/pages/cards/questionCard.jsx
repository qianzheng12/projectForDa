import React, {useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import {ANSWER_QUESTION} from "../graphQL/mutations";
import {useMutation} from "@apollo/react-hooks";
import Button from '@material-ui/core/Button';
import ReactQuill from "react-quill";
import {questionCardModoules} from "../utils/quillModules";
import {FOLLOW_QUESTION, UNFOLLOW_QUESTION} from "../graphQL/userMutation";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";
import ReportWindow from "../utils/reportWindow";
import Truncate from "react-truncate";
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import LinesEllipsis from 'react-lines-ellipsis'
import ReactHtmlParser from "react-html-parser";
import TextInputArea from "../posts/textInputArea";
import Tooltip from "@material-ui/core/Tooltip";

const QuestionCard = ({question, refetch, feedCard, followed,setGreyCover}) => {
    const {user} = question;
    const [answerMode, toggleAnswerButton] = useState(false);
    const [highLightFollowIcon, setHighLightFollowIcon] = useState(followed);
    const [editorState, setEditorState] = useState("");
    const [answerQuestion] = useMutation(ANSWER_QUESTION);
    const [followQuestionMutation] = useMutation(FOLLOW_QUESTION);
    const [unFollowQuestionMutation] = useMutation(UNFOLLOW_QUESTION);
    const [postExpanded,setExpanded] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [lineOfContent, setLineOfContent] = useState(5);
    const [report, setReport] = useState(false);


    const followQuestion = () => {
        followQuestionMutation({variables: {questionID: question.id}}).then((result) => {
            setHighLightFollowIcon(true);
        })
    };
    const unFollowQuestion = () => {
        unFollowQuestionMutation({variables: {questionID: question.id}}).then((result) => {
            setHighLightFollowIcon(false);})
    };
    const expand = ()=>{
        setExpanded(true);
    };
    const onPost = () => {
        if (answerMode) {
            if (editorState === "") {
                setShowWarning(true);
            } else {
                answerQuestion({variables: {questionId: question.id, answerContent: editorState}}).then((result) => {
                    setEditorState('');
                    refetch();
                });
                toggleAnswerButton(!answerMode);
                setShowWarning(false);

            }
        } else {
            toggleAnswerButton(!answerMode);
        }
    };

    return (
        <div className="card">
            <div className="questionHeader">
                <div className="questionTopics">
                    {question.topics.map(topic => {
                        return (<Link to={"/topic/"+topic.id}><span>#{topic.name}</span></Link>)
                    })}
                </div>
                <h3>{question.title}</h3>
                {user && <div><p>post by</p>
                    <Link to={"/Profile/"+ user.id}><p style={{color: '#FF9240', marginLeft: '0.5%'}}>{user.firstName + ' ' + user.lastName}</p></Link>
                    <p style={{marginLeft: '0.5%'}}><TimeAgo date={question.lastUpdated} live={false}/></p>
                </div>}

            </div>
            <div className="questionDescription">
                {postExpanded && <div>{ReactHtmlParser(question.description)}</div>}
                {!postExpanded &&<HTMLEllipsis onClick={expand} unsafeHTML={question.description} maxLine ='5' basedOn='letters' expand={expand} ellipsisHTML='...<a id="expandPostButton"> (expand)</a>'/>}
            </div>
            {answerMode &&
            <div className="answerInputArea">
                <TextInputArea postContent={editorState} setPostContent={(e)=>{setEditorState(e)}}/>
                {showWarning && <h2>Please enter your answer</h2>}
            </div>}
            <div className='questionActions'>
                {!highLightFollowIcon && <Tooltip title="follow question"><StarBorderIcon onClick={followQuestion}/></Tooltip>}
                {highLightFollowIcon && <Tooltip title="unfollow question"><StarRoundedIcon onClick={unFollowQuestion} style={{color: "#FF9240"}}/></Tooltip>}
                <Tooltip title="invite friend"><EmojiPeopleIcon/></Tooltip>
                <Tooltip title="report"><FlagOutlinedIcon onClick={() => {
                    setReport(true);
                }}/></Tooltip>
                {report && <div>
                    <div className="greyOutCoverBackground">
                    </div>
                    <ReportWindow user={user} closeWindow={() => {
                    setReport(false)
                }}/></div>}
                <div className="postButton">
                    {feedCard &&
                    <Link to={`/question/${question.id}`}><Button onClick={onPost}>
                        <span style={{textDecoration: "none"}}>Answer</span>
                    </Button> </Link>}
                    {!feedCard && <Button onClick={onPost}>
                        <span>{answerMode ? "Post" : "Answer"}</span>
                    </Button>}

                </div>
                {answerMode && <p onClick={() => toggleAnswerButton(!answerMode)}>cancel</p>}
            </div>
        </div>
    );
};


export default QuestionCard;