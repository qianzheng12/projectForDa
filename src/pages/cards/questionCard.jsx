import React, {useState} from 'react'
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from "@material-ui/core/IconButton";
import ReportIcon from '@material-ui/icons/Report';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import ReactQuill from "react-quill";
const QuestionCard = ({question}) => {
    const {user} = question;
    const [answerMode,toggleAnswerButton] = useState(false);
    const [editorState, setEditorState] = useState("");
    const onPost = ()=>{
        toggleAnswerButton(!answerMode);
        console.log(editorState);
    }

    return (
        <div className="card">
            <div className="questionHeader">
                <span>{question.description}</span>
                <h3>{question.title}</h3>
                <p>post by</p> <p style={{color: '#906604', marginLeft:'0.5%'}}>{user.firstName + ' '+ user.lastName}</p>
                <p style={{marginLeft:'0.5%'}}>{question.lastUpdated}</p>
            </div>
            <div className="questionDescription">
                <Typography variant="body2" color="textSecondary" component="p">
                    <div dangerouslySetInnerHTML={{ __html: question.description} } />

                </Typography>
            </div>
            { answerMode &&<div className="answerInputArea">
                <ReactQuill value={editorState}
                            onChange={setEditorState} />
            </div>}
            <div className='questionActions'>
                <IconButton aria-label="Favorite">
                    <FavoriteBorderIcon/>
                </IconButton>
                <IconButton aria-label="Favorite">
                    <FaceIcon/>
                </IconButton>
                <IconButton aria-label="Favorite">
                    <ReportIcon/>
                </IconButton>
                <div onClick={onPost} className="postButton">
                    <CreateIcon style={{marginLeft:'10%',marginTop:'8%'}}/> <span>{answerMode?"Post":"Answer"}</span>
                </div>
            </div>
        </div>
    );
};


export default QuestionCard;