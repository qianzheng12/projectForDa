import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import Wrapper from "./pages/wrapper/wrapper";
import * as serviceWorker from './serviceWorker';

render(
    <Wrapper/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
