import React, {useEffect, useState} from 'react';
import Navigator from './navigator'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import FeedAnswerPage from "../feedAnswers/feedAnswerPage";
import Explore from "../explorePage/explore";
import Questions from "../questionsPage/questions";
import "./wrapper.css";
import '../cards/cards.css'
import ApolloClient from 'apollo-boost';
import {Helmet} from "react-helmet";
import {ApolloProvider} from '@apollo/react-hooks';
import QuestionAnswers from "../questionAnswersPage/questionAnswers";
import PostPage from "../askQuestion/postPage";
import RegisterPage from "../homePage/register";
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import SignInPage from "../homePage/signIn";
import SearchPage from "../search/searchPage";
import TopicPage from '../topic/topicPage.jsx'
import {AddArticle} from "../article/addArticle";
import ArticlePage from "../article/articlePage";
import HomePage from "../homePage/homePage";
Amplify.configure(awsconfig);

const Wrapper = () => {
    const [askQuestionMode, toggleAskQuestionMode] = useState(false);
    const [selectedPage, setSelectedPage] = useState("FeedAnswerPage");
    const [authStatus, setAuthStatus] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        async function getAuthState() {
            try {
                const session = await Auth.currentSession();
                setAuthStatus(true);
                console.log(session);
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
            } catch (error) {
                if (error !== 'No current user') {
                    console.log(error);
                }
            }
        }

        getAuthState().then(data => {
            console.log(data)
        });
    }, []);

    const client = new ApolloClient({
        uri:'https://8p8g3orno1.execute-api.eu-west-2.amazonaws.com/dev',
        request: (operation) => {
            const token = localStorage.getItem('CognitoIdentityServiceProvider.43bqonj4u0bojdvmk40e3dcaeg.1c7b8cef-623a-458c-84ad-4493214a4194.idToken')
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })
        }
    })
    return (
        <ApolloProvider client={client}>
            <div className="wrapper">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>My Title</title>
                    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"/>
                </Helmet>
                <Router>
                    <Switch>
                        {!authStatus &&
                        <Route path="/">
                            <HomePage/>
                        </Route>
                        }
                        {authStatus &&
                        <div>
                            <Navigator askQuestionMode={askQuestionMode}
                                       toggleAskQuestionMode={toggleAskQuestionMode}
                                       selectedPage={selectedPage}/>
                            <Route path="/home">
                                <FeedAnswerPage setSelectedPage={setSelectedPage}/>
                            </Route>
                            <Route path="/explore">
                                <Explore setSelectedPage={setSelectedPage}/>
                            </Route>
                            <Route path="/answer">
                                <Questions setSelectedPage={setSelectedPage}/>
                            </Route>
                            <Route path="/question/:id" component={QuestionAnswers}/>
                            <Route path="/searchPage/:searchString" component={SearchPage}/>
                            <Route path="/addArticle" component={AddArticle}/>
                            <Route path="/article/:id" component={ArticlePage}/>
                            <Route path="/register">
                                <RegisterPage/>
                            </Route>
                            <Route path="/Topic/:topicName" component={TopicPage}/>
                        </div>
                        }

                    </Switch>
                    {askQuestionMode &&
                    <div>
                        <div className="askQuestionPageBackGround">

                        </div>
                        <div className="askQuestionPage">
                            <PostPage askQuestionMode={askQuestionMode}
                                      toggleAskQuestionMode={toggleAskQuestionMode}
                                      type="question"/>
                        </div>
                    </div>}
                </Router>

            </div>
        </ApolloProvider>)
};

export default Wrapper;