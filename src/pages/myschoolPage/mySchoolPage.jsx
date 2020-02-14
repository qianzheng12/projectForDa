import React, {useState} from 'react'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "../topic/topicWrapper";
import {useQuery} from "@apollo/react-hooks";
import {GET_FEED_ANSWERS} from "../graphQL/query";
import SchoolCard from "./schoolCard";
import './mySchoolPage.css'
import {GET_MY_SCHOOL} from "../graphQL/questionQuery";

const MySchoolPage = ({setSelectedPage,bookMarkedAnswers}) => {
    const {loading, error, data} = useQuery(GET_MY_SCHOOL);
    const [leftMargin, setLeftMargin] = useState("20vw");
    const [showTopic, toggleShowTopic] = useState(true);
    setSelectedPage("MySchool");
    if (loading) return <div/>;
    if (error) return <div/>;
    console.log(data);
    const {getMySchool,getMySchool:{questions},me:{followedTopics}} = data;
    console.log(questions);
    return (
        <div className="homePage">
            <div className="homePageContent" style={{marginLeft: leftMargin}}>
                <div className="feedAnswers">
                    <div className="schoolIntroduction">
                    <SchoolCard university={getMySchool}/>
                    </div>
                    {questions.map(question => {
                        const {answers} = question;
                        if(answers.length >= 1){
                            return (
                                <div className="feedAnswer">
                                    <FeedAnswerCard bookmarked={bookMarkedAnswers.some((b)=>{return b.id === answers[0].id})}
                                                    key={question.id} question={question} answer={answers[0]} profileBookmarkAnswer={false} showAction={true}/>
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
                    <TopicWrapper topics={followedTopics}/>
                </div>}
            </div>
        </div>
    )
}

export default MySchoolPage;