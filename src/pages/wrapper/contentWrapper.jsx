import React, {useRef, useState} from "react";
import {Route} from "react-router-dom";
import FeedAnswerPage from "../feedAnswers/feedAnswerPage";
import QuestionAnswers from "../questionAnswersPage/questionAnswers";
import SearchPage from "../search/searchPage";
import {AddArticle} from "../article/addArticle";
import ArticlePage from "../article/articlePage";
import TopicPage from "../topic/topicPage";
import ProfilePage from "../profile/profilePage";
import MessageBlock from "../messageSystem/messageBlock";
import Navigator from "./navigator";
import Explore from "../explorePage/explore";
import Questions from "../questionsPage/questions";
import PostPage from "../posts/postPage";
import {useQuery} from "@apollo/react-hooks";
import {ME} from "../graphQL/userQuery";
import ChangePasswordPage from "../Auth/changePasswordPage";

const ContentWrapper = ({url = "www.singularity.com"}) => {
    const [selectedPage, setSelectedPage] = useState("Home");
    const {loading, error, data, refetch} = useQuery(ME);

    const [postPageMode, setPostPageMode] = useState(false);
    const [greyCover, setGreyCover] = useState(false);
    if (loading) return <div/>;

    if (error) {

        return <div/>};
    const {me} = data;
    return (
        <div>


            <Navigator me={me} setGreyOutCover={setPostPageMode} selectedPage={selectedPage} greyOutCover={postPageMode}/>
            <div className="contentWrapper">
                {postPageMode &&
                <div>
                    <div className="greyOutCoverBackground">
                    </div>
                    <div className="askQuestionPage">
                        <PostPage askQuestionMode={postPageMode}
                                  toggleAskQuestionMode={setPostPageMode}
                                  type="question"/>
                    </div>
                </div>}
                {greyCover &&
                <div>
                    <div className="greyOutCoverBackground">
                    </div>
                </div>}
                <Route exact path="/">
                    <FeedAnswerPage bookMarkedAnswers={me.bookmarkedAnswers} setSelectedPage={setSelectedPage}/>
                </Route>
                <Route path="/explore">
                    <Explore setSelectedPage={setSelectedPage}/>
                </Route>
                <Route path="/answer">
                    <Questions setGreyCover={setGreyCover} followedQuestions={me.followedQuestions} setSelectedPage={setSelectedPage}/>
                </Route>
                <Route
                    path="/question/:id"
                    render={(props) => <QuestionAnswers {...props} followedQuestions={me.followedQuestions} bookMarkedAnswers={me.bookmarkedAnswers}/>} />
                <Route path="/searchPage/:searchString" component={SearchPage}/>
                <Route path="/addArticle" component={AddArticle}/>
                <Route path="/article/:id" component={ArticlePage}/>
                <Route path="/Topic/:topicName" component={TopicPage}/>
                <Route
                  path="/Profile/:userId"
                  render={(props) => <ProfilePage {...props} myId={me.id} />} />
                <Route exact path="/Home">
                    <FeedAnswerPage bookMarkedAnswers={me.bookmarkedAnswers} setSelectedPage={setSelectedPage}/>
                </Route>
                <Route exact path="/ChangePassword">
                    <ChangePasswordPage bookMarkedAnswers={me.bookmarkedAnswers} setSelectedPage={setSelectedPage}/>
                </Route>
                <div className="messageWrapper">
                    <MessageBlock/>
                </div>
            </div>
        </div>
    )
};
export default ContentWrapper;