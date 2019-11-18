import React, {useState} from 'react'
import './askQuestionPage.css';
import CloseIcon from '@material-ui/icons/Close';
import { useMutation } from '@apollo/react-hooks';
import {ASK_QUESTION} from '../graphQL/mutations';
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
const AskQuestionPage = ({askQuestionMode,toggleAskQuestionMode}) => {
    const [topics,addTopic] = useState([]);
    const [currentTopicValue,setCurrentTopicValue] = useState("");
    const [askQuestion] = useMutation(ASK_QUESTION);
    const enterTopic = (e) => {
        if(e.key === 'Enter'){
            const newTopicList = topics.concat(e.target.value);
            addTopic(newTopicList);
            setCurrentTopicValue("");
        }
    };
    return (
        <Formik
            initialValues={{title: '', anonymouslyCheck: false,description:'', mySchool:false}}

            onSubmit={(values, {setSubmitting}) => {
                askQuestion({ variables: { title:values.title,description:values.description}}).then(
                    ()=>{
                        toggleAskQuestionMode();
                    }
                )
            }}
        >{({
               values,
               handleChange,
               handleSubmit,
           }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="askQuestionForm">
                        <div className="askQuestionFormHeader">
                            <h1 >
                                Add a question
                            </h1>
                            <CloseIcon  className="askQuestionFormClose"  onClick={()=>toggleAskQuestionMode(!askQuestionMode)}/>
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
                                    <li> Make sure your question is readable and has correct grammar.</li>
                                    <li>  In your description, you may want to add the context of your situation or be more precise about what it is that you want people to answer.
                                    </li>
                                </ul>
                            </div>
                            <div className="topicInputArea">
                                <input value={currentTopicValue} onChange={(e)=>{setCurrentTopicValue(e.target.value)}} placeholder="Topics" onKeyPress={enterTopic} id="topicInputArea"/>
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
                                    <li>  Good topics allows you to receive better quality answers.</li>
                                    <li>  You may create new topics if you can't find an appropriate topic.</li>
                                    <li>  Try to be specific when picking from existing topics.</li>
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

export default AskQuestionPage;