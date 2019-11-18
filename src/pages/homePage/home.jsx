import React, {useEffect, useState} from 'react'
import './homePage.css'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "./topicWrapper";
import {useQuery} from '@apollo/react-hooks';
import {GET_FEED_ANSWERS} from '../graphQL/query'

const mockQuestions = [{
    title: "My friend is stupid",
    answers: [{content: "You have to kill him"}],
    description: "He keep being stupid and act like idiot",
    lastUpdate: "two days ago",
    user: {id: "zhengda", firstName: "Da", lastName: "Zheng", school: "Imperial College"}
},
    {
        title: "My teacher is stupid",
        answers: [{content: "You have to love him"}],
        description: "He keep being stupid and act like idiot",
        lastUpdate: "two days ago",
        user: {id: "zhengda", firstName: "Da", lastName: "Zheng", school: "Imperial College"}
    },
    {
        title: "My brother is stupid",
        answers: [{content: "You have to tell him that he is so stupid"}],
        description: "He keep being stupid and act like idiot",
        lastUpdate: "two days ago",
        user: {id: "zhengda", firstName: "Da", lastName: "Zheng", school: "Imperial College"}
    }];
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