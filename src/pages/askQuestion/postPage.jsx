import React, {useState} from 'react'
import './postPage.css';
import CloseIcon from '@material-ui/icons/Close';
import { useMutation } from '@apollo/react-hooks';
import {ADD_TOPIC_TO_QUESTION, ASK_QUESTION, CREATE_TOPIC} from '../graphQL/mutations';
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
const PostPage = ({askQuestionMode,toggleAskQuestionMode,type}) => {
    const [topics,addTopic] = useState([]);
    const [currentTopicValue,setCurrentTopicValue] = useState("");
    const [askQuestion] = useMutation(ASK_QUESTION);
    const [createTopic] = useMutation(CREATE_TOPIC);
    const [addTopicToQuestion] = useMutation(ADD_TOPIC_TO_QUESTION);
    const [topicEmptyError, showEmptyTopicError] = useState(false);
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    const enterTopic = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            if(currentTopicValue !== ""){
                const newTopicList = topics.concat(currentTopicValue);
                addTopic(newTopicList);
                createTopic({variables: {topicName:currentTopicValue}}).then(
                    (result)=>{
                        console.log(result)
                    }
                );
                setCurrentTopicValue("");
            }
        }
    };
    return (
        <Formik
            initialValues={{title: '', anonymouslyCheck: false,description:'', mySchool:false}}

            onSubmit={(values, {setSubmitting}) => {
                if(topics.length === 0){
                    showEmptyTopicError(true);
                }
                else{
                    askQuestion({ variables: { title:values.title,description:values.description}}).then(
                        (result)=>{
                            const{data} = result;
                            console.log(data);
                            console.log(data.createQuestion.id);
                            topics.map((topic) => {
                                addTopicToQuestion({ variables: { questionID:data.createQuestion.id,topicName:topic}}).then();
                                return topic
                            });
                            showEmptyTopicError(false);
                            toggleAskQuestionMode();
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
            <form onSubmit={handleSubmit} onKeyDown={onKeyDown}>
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
                                    placeholder="What is your question?"
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
                                <input
                                    required
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    placeholder="Describe your question in more detail for better quality answers!" />
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
                                <input value={currentTopicValue} onChange={(e)=>{setCurrentTopicValue(e.target.value)}} onKeyDown={enterTopic} placeholder="Topics"  id="topicInputArea"/>
                                {topicEmptyError && <p>Please enter a topic</p>}
                                <div className="topicsPresentArea">
                                    {topics.map(topic => (
                                        <div className="enteredTopic">
                                            #{topic}
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
                                <div className="askButton">
                                    <Button type="submit"><span>Ask</span></Button>
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