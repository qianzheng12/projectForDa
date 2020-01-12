import React, {useState} from 'react'
import './postPage.css';
import CloseIcon from '@material-ui/icons/Close';
import {useLazyQuery, useMutation, useQuery} from '@apollo/react-hooks';
import {ADD_TOPIC_TO_QUESTION, POST_QUESTION_ARTICLE, CREATE_TOPIC} from '../graphQL/mutations';
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import TextInputArea from "./textInputArea";
import SearchTopicDropDown from "../search/searchTopicDropDown";
import {SEARCH_TOPIC_BY_NAME} from "../graphQL/topicQuery";
import {extractImage} from "../utils/extractImg";
import InfoIcon from '@material-ui/icons/Info';
import ThumbUpAltOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
const PostPage = ({askQuestionMode,toggleAskQuestionMode,type}) => {
    const [topics,setTopics] = useState([]);
    const [currentTopicValue,setCurrentTopicValue] = useState("");
    const [checkTopicName, { loading, data }] = useLazyQuery(SEARCH_TOPIC_BY_NAME,
        {onCompleted: () => {
            const topic = data.getTopicByName;
            if(topic){
                chooseTopic(topic.name,topic.id);
            }
            else{
                createTopic({variables: {topicName:currentTopicValue}}).then(
                    (result)=>{
                        const {createTopic} = result.data;
                        chooseTopic(createTopic.name,createTopic.id);
                    }
                )
            }
        },
            fetchPolicy:"network-only"
        });

    const [askQuestion] = useMutation(POST_QUESTION_ARTICLE);
    const [createTopic] = useMutation(CREATE_TOPIC);
    const [addTopicToQuestion] = useMutation(ADD_TOPIC_TO_QUESTION);
    const [topicEmptyError, showEmptyTopicError] = useState(false);
    const [postContent, setPostContent] = useState("");
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    const chooseTopic = (topicName,topicId) => {
        const topic = {topicName,topicId};
        if(!topics.some(i => (i.topicName === topicName))){
            const newTopicList = topics.concat(topic);
            setTopics(newTopicList);
        }

        setCurrentTopicValue("");
    };

    const addNewTopic = (topic) => {
        checkTopicName(
            {
                variables:{topicName:topic}
            });

    };

    return (
        <Formik
            initialValues={{title: '', anonymouslyCheck: false,description:'', mySchool:false}}

            onSubmit={(values, {setSubmitting}) => {
                if(topics.length === 0){
                    showEmptyTopicError(true);
                }
                else{
                    askQuestion({ variables: { title:values.title,description:postContent,thumbnail:extractImage(postContent), isArticle:type==="article"}}).then(
                        (result)=>{
                            const{data} = result;
                            topics.map((topic) => {
                                addTopicToQuestion({ variables: { questionID:data.createQuestion.id,topicID:topic.topicId}}).then();
                                return topic
                            });
                            showEmptyTopicError(false);
                            if(type === "question"){
                                toggleAskQuestionMode();
                            }
                        }
                    ).catch(

                    )
                }
            }}
        >{({
               values,
               handleChange,
               handleSubmit,
           }) => (
            <form onSubmit={handleSubmit} autocomplete="off" onKeyDown={onKeyDown}>
                <div>
                    <div className="askQuestionForm">
                        <div className="askQuestionFormHeader">
                            {type === "question" &&<div> <h1>
                                Add a question
                            </h1>
                                <CloseIcon  className="askQuestionFormClose"  onClick={()=>toggleAskQuestionMode(!askQuestionMode)}/></div>}
                            {type === "article" &&<div> <h1>
                                Write an article
                            </h1></div>}
                        </div>
                        <div className="askQuestionInputArea">
                            <div  className="questionTitleInput">
                                <input
                                    required
                                    onChange={handleChange}
                                    value={values.title}
                                    name="title"
                                    placeholder={type === "article"?"What is your headline":"What is your question?"}
                                    id="titleInput" />
                                <input
                                    onChange={handleChange}
                                    value={values.anonymouslyCheck}
                                    name="anonymouslyCheck"
                                    id="anonymouslyCheck"
                                    type="checkbox"/>
                                <p>post anonymously</p>
                            </div>
                            <div className="questionDescriptionInputArea">
                                <TextInputArea postContent={postContent} setPostContent={(e)=>{setPostContent(e)}}/>
                            </div>
                            <div className="questionDescriptionAdvice">
                                <ul>
                                    {type === "question" &&<div>
                                        <li> Make sure your question is readable and has correct grammar.</li>
                                        <li>  In your description, you may want to add the context of your situation or be more precise about what it is that you want people to answer.
                                        </li></div>}
                                    {type === "article" &&<div>
                                    <li> Write an article to share your expertise or your personal experience.</li>
                                        <li> If you are making an argument or taking a stand, be sure to avoid <Link>logical fallacies.</Link></li>
                                    <li> Be sure to proofread and double-check for spelling and grammatical errors.</li>
                                    <li> Avoid plagirizing and be sure to obtain approving before using copyrighted materials.</li></div>}
                                </ul>
                            </div>
                            <div className="topicInputArea">
                                <div className="topicInputWrapper">
                                    <input type="search"
                                           value={currentTopicValue}
                                           onChange={(e)=>{setCurrentTopicValue(e.target.value)}}
                                           placeholder="Topics"
                                           id="topicInputArea"/>
                                    {currentTopicValue.length>0 &&
                                    <div className="topicSearchDropdown" style={{width:"198px"}}>
                                        <SearchTopicDropDown chooseTopic={chooseTopic} enteredTopic={currentTopicValue} addNewTopic={addNewTopic} allowCreate={true}/>
                                    </div>}
                                    {topicEmptyError && <p>Please enter a topic</p>}
                                </div>
                                <div className="topicsPresentArea">
                                    {topics.map(topic => (
                                        <div className="enteredTopic">
                                            #{topic.topicName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="topicAdvice">
                                <ul>
                                    {type === "question" &&<div>
                                    <li>  Good topics allows you to receive better quality answers.</li>
                                    <li>  You may create new topics if you can't find an appropriate topic.</li>
                                        <li>  Try to be specific when picking from existing topics.</li></div>}
                                    {type === "article" &&<div>
                                        <li>  Picking good topics allows your article to better address the audience that you intended. </li>
                                        <li>  You may create new topics if you can't find an appropriate topic.</li>
                                        <li>  Try to be specific when picking from existing topics.</li></div>}
                                </ul>
                            </div>
                            <div className="footer">
                                <input
                                    id="mySchool"
                                    onChange={handleChange}
                                    value={values.mySchool}
                                    name="mySchool"
                                    type="checkbox"/><p>my school</p>
                                <Tooltip title="Only your schoolmate can see it."><InfoIcon/></Tooltip>
                                <div className="askButton">
                                    <Button type="submit"><span>{type === "article"?"Post":"Ask"}</span></Button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </form>
        )}
        </Formik>
    )
}

export default PostPage;