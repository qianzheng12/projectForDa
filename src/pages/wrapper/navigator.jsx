import React from 'react'
import {Link} from 'react-router-dom'
import SearchInput from "./searchInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Navigator = ({askQuestionMode,toggleAskQuestionMode}) => {
    return (
        <div className="navBar">
            <nav>
                <h1 className="logo">Singularity</h1>
                <div className="tags">
                    <ol>
                        <li><Link to='/Home'>Home</Link></li>
                        <li><Link to='/Explore'>Explore</Link></li>
                        <li><Link to='/Answer'>Answer</Link></li>
                    </ol>
                </div>
                <SearchInput/>
                <div className="askButton" onClick={()=>toggleAskQuestionMode(!askQuestionMode)}>
                    <span>Ask</span>
                </div>
                <div className="accountIcon">
                    <AccountCircleIcon/>
                </div>

            </nav>

        </div>)
};
export default Navigator;