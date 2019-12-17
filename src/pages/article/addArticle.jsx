import React, {useState} from "react";
import './addArticle.css'
import {useMutation} from "@apollo/react-hooks";
import {ADD_TOPIC_TO_QUESTION, POST_QUESTION_ARTICLE, CREATE_TOPIC} from "../graphQL/mutations";
import PostPage from "../askQuestion/postPage";

export const AddArticle = () => {
    const [topics, addTopic] = useState([]);
    const [currentTopicValue, setCurrentTopicValue] = useState("");
    const [askQuestion] = useMutation(POST_QUESTION_ARTICLE);
    const [createTopic] = useMutation(CREATE_TOPIC);
    const [addTopicToQuestion] = useMutation(ADD_TOPIC_TO_QUESTION);
    const [topicEmptyError, showEmptyTopicError] = useState(false);

    function onKeyDown(keyEvent) {
        console.log(keyEvent);
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    const enterTopic = () => {
        if (currentTopicValue !== "") {
            const newTopicList = topics.concat(currentTopicValue);
            addTopic(newTopicList);
            createTopic({variables: {topicName: currentTopicValue}}).then(
                (result) => {
                    console.log(result)
                }
            );
            setCurrentTopicValue("");
        }
    };
    return (
        <div className="AddArticleWrapper">
            <div className="addArticleFormWrapper">
                <PostPage type="article"/>
            </div>
        </div>
    )
};
