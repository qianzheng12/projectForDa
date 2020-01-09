import React, {useState} from "react";
import './profileHomePage.css'
import './profileQuestion.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ProfileQuestionCard from "../cards/profileQuestionCard";
const ProfileQuestionsPage = ({type,data}) => {
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input placeholder="search"/>
            </div>
            {type === "question" &&
                data.map(post => (
                    !post.isArticle &&
                    <div className="profileQuestion">
                        <ProfileQuestionCard post={post} content={post.description} type={"questions"}/>
                    </div>
                ))
            }
            {type === "answer" &&
                data.map(answer => (
                    <div className="profileQuestion">
                        <ProfileQuestionCard post={answer.question} content={answer.content} type={"answer"}/>
                    </div>
                ))
            }
            {type === "article" &&
                data.map(post => (
                    post.isArticle &&
                    <div className="profileQuestion">
                        <ProfileQuestionCard post={post} content={post.description} type={"article"}/>
                    </div>
                ))
            }

        </div>
    )
};
export default ProfileQuestionsPage;