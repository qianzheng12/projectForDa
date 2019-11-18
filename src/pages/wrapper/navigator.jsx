import React from 'react'
import {Link} from 'react-router-dom'
import SearchInput from "./searchInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
const Navigator = props => {
    const {askQuestionMode,toggleAskQuestionMode,selectedPage} = props;
    console.log(selectedPage);
    return (
        <div className="navBar">
            <nav>
                <h1 className="logo">Singularity</h1>
                <div className="tags">
                    <ol>
                        <li className={selectedPage==="Home"?"activeLink":"unActiveLink"}><Link to='/Home'>Home</Link></li>
                        <li className={selectedPage==="Questions"?"activeLink":"unActiveLink"}><Link to='/Answer'>Answer</Link></li>
                        <li className={selectedPage==="Explore"?"activeLink":"unActiveLink"}><Link to='/Explore'>#My school</Link></li>
                    </ol>
                </div>
                <SearchInput/>
                <div className="askQuestionWrapper">
                <Button id="askQuestionButton" onClick={()=>toggleAskQuestionMode(!askQuestionMode)}>
                    <AddBoxOutlinedIcon/><span>Question</span>
                </Button>
                <Button id="postArticleButton">
                    <AddBoxOutlinedIcon/><span>Article</span>
                </Button>
                </div>
                <div className="accountIcon">
                    <AccountCircleIcon/>
                </div>

            </nav>

        </div>)
};
export default Navigator;