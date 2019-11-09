import React, {useState} from 'react';
import Navigator from './navigator'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "../homePage/home";
import Explore from "../explorePage/explore";
import Questions from "../questionsPage/questions";
import "./wrapper.css";
import '../cards/cards.css'
import ApolloClient from 'apollo-boost';
import {Helmet} from "react-helmet";
import {ApolloProvider} from '@apollo/react-hooks';
import QuestionAnswers from "../questionAnswersPage/questionAnswers";
import AskQuestionPage from "../askQuestion/askQuestionPage";

const client = new ApolloClient({
    uri: 'https://8p8g3orno1.execute-api.eu-west-2.amazonaws.com/dev',
});
const Wrapper = () => {
    const [askQuestionMode, toggleAskQuestionMode] = useState(true);
    return (
        <ApolloProvider client={client}>
            <div className="wrapper">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>My Title</title>
                    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"/>
                </Helmet>
                <Router>
                    <Navigator askQuestionMode={askQuestionMode}
                               toggleAskQuestionMode={toggleAskQuestionMode}/>
                    <Switch>
                        <Route path="/home">
                            <Home/>
                        </Route>
                        <Route path="/explore">
                            <Explore/>
                        </Route>
                        <Route path="/answer">
                            <Questions/>
                        </Route>
                        <Route path="/questions/:id">
                            <QuestionAnswers/>
                        </Route>
                    </Switch>
                    {askQuestionMode &&
                    <div>
                        <div className="askQuestionPageBackGround">

                        </div>
                        <div className="askQuestionPage">
                            <AskQuestionPage askQuestionMode={askQuestionMode}
                                             toggleAskQuestionMode={toggleAskQuestionMode}/>
                        </div>
                    </div>}
                </Router>

            </div>
        </ApolloProvider>)
};

export default Wrapper;