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
import RegisterPage from "../userAuth/register";

const client = new ApolloClient({
    uri: 'https://8p8g3orno1.execute-api.eu-west-2.amazonaws.com/dev',
});
const Wrapper = () => {
    const [askQuestionMode, toggleAskQuestionMode] = useState(true);
    const [selectedPage, setSelectedPage] = useState("Home");
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
                               toggleAskQuestionMode={toggleAskQuestionMode}
                               selectedPage={selectedPage}/>
                    <Switch>
                        <Route path="/home">
                            <Home setSelectedPage={setSelectedPage}/>
                        </Route>
                        <Route path="/explore">
                            <Explore setSelectedPage={setSelectedPage}/>
                        </Route>
                        <Route path="/answer">
                            <Questions setSelectedPage={setSelectedPage}/>
                        </Route>
                        <Route path="/questions/:id" component={QuestionAnswers}/>
                        <Route path="/register">
                            <RegisterPage/>
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