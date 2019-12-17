import React, {useState} from "react";
import './profileHomePage.css'
import './profileQuestion.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ProfileQuestionCard from "../cards/profileQuestionCard";
import {useQuery} from "@apollo/react-hooks";
import {FEED_QUESTIONS, GET_FEED_ANSWERS} from "../graphQL/query";
const ProfileQuestionsPage = props => {
    const {loading, error, data} = useQuery(FEED_QUESTIONS);
    if (loading) return <div/>;
    if (error) return <div/>;
    const {questions} = data;
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input placeholder="search"/>
            </div>
            {
                questions.map(question => (
                    <div className="profileQuestion">
                        <ProfileQuestionCard question={question}/>
                    </div>
                ))
            }

        </div>
    )
};
export default ProfileQuestionsPage;