import React, {useState} from 'react'
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import {ANSWER_QUESTION} from "../graphQL/mutations";
import {useMutation} from "@apollo/react-hooks";
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Truncate from "react-truncate";
const QuestionCard = ({question}) => {
    const {user} = question;
    console.log(question)
    const [answerMode,toggleAnswerButton] = useState(false);
    const [editorState, setEditorState] = useState("");
    const [answerQuestion] = useMutation(ANSWER_QUESTION);
    const [showWarning, setShowWarning] = useState(false);
    const [lineOfContent, setLineOfContent] = useState(5);
    const onPost = ()=>{
       if(answerMode){
           if(editorState===""){
               setShowWarning(true);
           }
           else{
               answerQuestion({ variables: { questionId:question.id, answerContent:editorState}}).then((result)=>{
                   console.log(result);
               });
               toggleAnswerButton(!answerMode);
               setShowWarning(false);
           }
        }
       else{
           toggleAnswerButton(!answerMode);
       }


    };

    return (
        <div className="card">
            <div className="questionHeader">
                <div className="questionTopics">
                    {question.topics.map( topic => {
                        return (<span>#{topic.name}</span>)
                    })}
                </div>
                <h3>{question.title}</h3>
                {user&&<div><p>post by</p> <p style={{color: '#906604', marginLeft:'0.5%'}}>{user.firstName + ' '+ user.lastName}</p></div>}
                <p style={{marginLeft:'0.5%'}}>{question.lastUpdated}</p>
            </div>
            <div className="questionDescription">
                <Typography variant="body2" color="textSecondary" component="p">

                    <Truncate lines={lineOfContent} ellipsis={<span>...<h3 onClick={()=>setLineOfContent(-1)}> Read more</h3></span>}>
                        <div dangerouslySetInnerHTML={{ __html: question.description} } />
                    </Truncate>
                </Typography>
            </div>
            { answerMode &&
            <div className="answerInputArea">
                <textarea value={editorState}
                       onChange={(e)=>{setEditorState(e.target.value)}}/>
                {showWarning && <h2>Please enter your answer</h2>}
            </div>}
            <div className='questionActions'>
                <StarBorderIcon color="yellow"/>
                <EmojiPeopleIcon/>
                <FlagOutlinedIcon/>
                <div className="postButton">
                    <Button onClick={onPost} >
                        <span>{answerMode?"Post":"Answer"}</span>
                    </Button>
                </div>
                { answerMode &&<p onClick={()=>toggleAnswerButton(!answerMode)}>cancel</p>}
            </div>
        </div>
    );
};


export default QuestionCard;