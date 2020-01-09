import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "./wrapper.css";
import '../cards/cards.css'
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {Helmet} from "react-helmet";
import {ApolloProvider} from '@apollo/react-hooks';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import HomePage from "../homePage/homePage";
import './quill.css'
import ContentWrapper from "./contentWrapper";
import {ErrorBoundary} from "../utils/errorHandler";
Amplify.configure(awsconfig);

/* 
    Application wrapper, provide route ability and user verification ability
    Show navigation bar with content if user is authorised.
    Else show homePage which is used by Client to sign in and register.
    */
const Wrapper = () => {
    const [authStatus, setAuthStatus] = useState(undefined);
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    async function getAuthState() {
        try {
            const result = await Auth.currentSession();
            setToken(result.getIdToken().getJwtToken());
            setAuthStatus(true);
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
            } catch (error) {
            if (error !== 'No current user') {
            }
            else{
                setAuthStatus(false)
            }
        }
    }

    useEffect(() => {
        getAuthState().then(data => {

        });

    }, []);
    const cache = new InMemoryCache();
    const setSession = (rememberMe) => {
        if (!rememberMe){
            window.onbeforeunload = ()=>{
                localStorage.clear();
            }
        }
        else{
            window.onbeforeunload = ()=>{
            }
        }
        getAuthState().then(data=>{

        })
    };
    const client = new ApolloClient({
        uri:'https://ivuzzjl262.execute-api.eu-west-2.amazonaws.com/develop/',
        cache,
        request: (operation) => {
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })
        }
    });
    return (
        <ApolloProvider client={client}>
            <ErrorBoundary>
            <div className="wrapper">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Singularity</title>
                </Helmet>
                <Router>
                    <Switch>
                        {
                            authStatus === undefined &&
                            <div/>
                        }
                        {
                            !authStatus &&
                            <Route path="/">
                                <HomePage setSession = {setSession}/>
                            </Route>
                        }
                        {
                            authStatus &&
                            <ContentWrapper/>
                        }
                    </Switch>
                </Router>
            </div>
            </ErrorBoundary>
        </ApolloProvider>)
};

export default Wrapper;