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
import MySchoolPage from "../myschoolPage/mySchoolPage";
import Questions from "../questionsPage/questions";
import PostPage from "../posts/postPage";
import {useQuery} from "@apollo/react-hooks";
import {ME} from "../graphQL/userQuery";
import ChangePasswordPage from "../Auth/changePasswordPage";

const ContentWrapper = () => {
    const [selectedPage, setSelectedPage] = useState("Home");
    const {loading, error, data, refetch} = useQuery(ME,{fetchPolicy: "network-only"});

    const [postPageMode, setPostPageMode] = useState(false);
    const [greyCover, setGreyCover] = useState(false);

    if (loading) return <div/>;

    if (error) {

        return <div/>};
    const {me} = data;
    return (
        <div>
            {postPageMode &&
            <div>
                <div className="greyOutCoverBackground">
                </div>
                <div className="askQuestionPage">
                    <PostPage askQuestionMode={postPageMode}
                              toggleAskQuestionMode={setPostPageMode}
                              universityId={me.university.id}
                              type="question"/>
                </div>
            </div>}


            <Navigator me={me} setGreyOutCover={setPostPageMode} selectedPage={selectedPage} greyOutCover={postPageMode}/>
            <div className="contentWrapper">

                <Route exact path="/">
                    <FeedAnswerPage bookMarkedAnswers={me.bookmarkedAnswers} setSelectedPage={setSelectedPage}/>
                </Route>
                <Route path="/MySchool">
                    <MySchoolPage setSelectedPage={setSelectedPage} bookMarkedAnswers={me.bookmarkedAnswers}/>
                </Route>
                <Route path="/answer">
                    <Questions setGreyCover={setGreyCover} followedQuestions={me.followedQuestions} setSelectedPage={setSelectedPage}/>
                </Route>
                <Route
                    path="/question/:id"
                    render={(props) => <QuestionAnswers {...props} setGreyCover={setGreyCover} followedQuestions={me.followedQuestions} bookMarkedAnswers={me.bookmarkedAnswers}/>} />
                <Route path="/searchPage/:searchString" component={SearchPage}/>
                <Route
                    path="/addArticle"
                    render={(props) => <AddArticle {...props} university={me.university.id}/>} />
                <Route path="/article/:id" component={ArticlePage}/>
                <Route
                    path="/Topic/:topicName"
                    render={(props) => <TopicPage {...props} />} />
                <Route
                  path="/Profile/:userId"
                  render={(props) => <ProfilePage {...props} me={me} refetchMe={refetch}/>} />
                <Route exact path="/Home">
                    <FeedAnswerPage bookMarkedAnswers={me.bookmarkedAnswers} setSelectedPage={setSelectedPage}/>
                </Route>
                <Route exact path="/ChangePassword">
                    <ChangePasswordPage  setSelectedPage={setSelectedPage}/>
                </Route>
                <div className="messageWrapper">
                    <MessageBlock/>
                </div>
            </div>
        </div>
    )
};
export default ContentWrapper;