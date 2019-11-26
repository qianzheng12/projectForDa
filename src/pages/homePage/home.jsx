import React, {useEffect, useState} from 'react'
import './homePage.css'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "./topicWrapper";
import {useQuery} from '@apollo/react-hooks';
import {GET_FEED_ANSWERS} from '../graphQL/query'

const Home = props => {
    const {loading, error, data} = useQuery(GET_FEED_ANSWERS);
    const [leftMargin, setLeftMargin] = useState("20vw");
    const [showTopic, toggleShowTopic] = useState(true);
    props.setSelectedPage("Home");
    useEffect(() => {
        /*window.addEventListener("resize", () => {
            console.log(window.innerWidth);

            if (window.innerWidth < 900) {
                setLeftMargin("50px");
                toggleShowTopic(false)
            } else {
                setLeftMargin("25vw");
                toggleShowTopic(true)
            }
        });
        return window.removeEventListener("resize", () => {
        });*/
    });
    if (loading) return <div/>;
    if (error) return <div/>;
    console.log(data);
    const {questions} = data;
    return (
        <div className="homePage">
            <div className="homePageContent" style={{marginLeft: leftMargin}}>
                <div className="feedAnswers">
                    {questions.map(question => {
                        if(question.answers.length >= 1){
                            return (
                                <div className="feedAnswer">
                                    <FeedAnswerCard key={question.id} question={question}/>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
                {showTopic &&
                <div className="topics">
                    <div className="topicHeader">
                        <p>Topics</p>
                    </div>
                    <TopicWrapper/>
                </div>}
            </div>
        </div>

    )
};

export default Home;