
import React from "react";
import './profileBookmark.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {useQuery} from "@apollo/react-hooks";
import {GET_FEED_ANSWERS} from "../graphQL/query";
import FeedAnswerCard from "../cards/feedAnswerCard";
import {USER_BOOKMARKED_ANSWERS} from "../graphQL/userQuery";
const ProfileBookmarkPage = props => {
    const {loading, error, data,refetch} = useQuery(USER_BOOKMARKED_ANSWERS);
    if (loading) return <div/>;
    if (error) return <div/>;
    const {me:{bookmarkedAnswers}} = data;
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input placeholder="search"/>
            </div>
            <div className="profileRightPartContent">
                {bookmarkedAnswers.map(bookmarkAnswer => {
                    const {question} = bookmarkAnswer;
                    return (
                        <div className="feedAnswer">
                            <FeedAnswerCard
                                bookmarked={true}
                                key={question.id}
                                question={question}
                                answer={bookmarkAnswer}
                                profileBookmarkAnswer={true}
                                showAction={false}
                                refetch={refetch}/>
                        </div>
                    );

                    return null;
                })}
            </div>
        </div>
    )
};
export default ProfileBookmarkPage;