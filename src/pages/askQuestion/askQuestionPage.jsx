import React, {useState} from 'react'
import './askQuestionPage.css';
import CloseIcon from '@material-ui/icons/Close';
const AskQuestionPage = ({askQuestionMode,toggleAskQuestionMode}) => {
    const [topics,addTopic] = useState([]);
    const [currentTopicValue,setCurrentTopicValue] = useState("");
    const enterTopic = (e) => {
        if(e.key === 'Enter'){
            const newTopicList = topics.concat(e.target.value);
            addTopic(newTopicList);
            console.log(topics);
            setCurrentTopicValue("");
        }
    }
    return (
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
                        <input placeholder="What is your question?" id="titleInput" />
                        <input id="anonymouslyCheck" type="checkbox"/>
                        <p>post anonymously</p>
                    </div>
                    <div className="questionDescriptionInputArea">
                        <input placeholder="Describe your question in more detail for better quality answers!" />
                    </div>
                    <div className="questionDescriptionAdvice">
                        <ul>
                            <li> Make sure your question is readable and has correct grammar.</li>
                            <li>  In your description, you may want to add the context of your situation or be more precise about what it is that you want people to answer.
                            </li>
                        </ul>
                    </div>
                    <div className="topicInputArea">
                        <input placeholder="Topics" onKeyPress={enterTopic} id="topicInputArea"/>
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
                        <input id="mySchool" value={currentTopicValue} onChange={(e)=>setCurrentTopicValue(e.target.value)} type="checkbox"/><p>my school</p>
                        <div className="postButton">
                            <span>Ask</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AskQuestionPage;