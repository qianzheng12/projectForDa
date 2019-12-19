import React, {useEffect, useState} from 'react';
import Navigator from './navigator'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import FeedAnswerPage from "../feedAnswers/feedAnswerPage";
import Explore from "../explorePage/explore";
import Questions from "../questionsPage/questions";
import "./wrapper.css";
import '../cards/cards.css'
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {Helmet} from "react-helmet";
import {ApolloProvider} from '@apollo/react-hooks';
import { onError } from 'apollo-link-error';
import QuestionAnswers from "../questionAnswersPage/questionAnswers";
import PostPage from "../posts/postPage";
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import SearchPage from "../search/searchPage";
import TopicPage from '../topic/topicPage.jsx'
import {AddArticle} from "../article/addArticle";
import ArticlePage from "../article/articlePage";
import HomePage from "../homePage/homePage";
import './quill.css'
import ProfilePage from "../profile/profilePage";
import MessageBlock from "../messageSystem/messageBlock";
Amplify.configure(awsconfig);

const Wrapper = () => {
    const [selectedPage, setSelectedPage] = useState("FeedAnswerPage");
    const [authStatus, setAuthStatus] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    useEffect(() => {
        async function getAuthState() {
            try {
                const result = await Auth.currentSession();
                setToken(result.getIdToken().getJwtToken());
                setAuthStatus(true);
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
    const cache = new InMemoryCache();
    const client = new ApolloClient({
        uri:'https://ivuzzjl262.execute-api.eu-west-2.amazonaws.com/develop/',
        cache,
        request: (operation) => {
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })
        },
        onError:onError(({ response, operation }) => {
        if (operation.operationName === "IgnoreErrorsQuery") {
            response.errors = null;
        }})
    });
    return (
        <ApolloProvider client={client}>
            <div className="wrapper">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>My Title</title>
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
                            <Route exact path="/">
                                <FeedAnswerPage setSelectedPage={setSelectedPage}/>
                            </Route>
                            <Navigator selectedPage={selectedPage} />
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
                            <Route path="/Topic/:topicName" component={TopicPage}/>
                            <Route path="/Profile/:userId" component={ProfilePage}/>
                            <Route exact path="/Home">
                                <FeedAnswerPage setSelectedPage={setSelectedPage}/>
                            </Route>
                            <div className="messageWrapper">
                                <MessageBlock/>
                            </div>
                        </div>
                        }
                    </Switch>
                </Router>

            </div>
        </ApolloProvider>)
};

export default Wrapper;