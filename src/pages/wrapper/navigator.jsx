import React, {useState} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import SearchInput from "./searchInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Auth } from 'aws-amplify';
import PostPage from "../posts/postPage";
const Navigator = props => {
    const {selectedPage} = props;
    const [askQuestionMode,toggleAskQuestionMode] = useState(false);
    const signOut = () => {
        Auth.signOut()
            .then(data => window.location.reload())
            .catch(err => console.log(err));
    };
    console.log(selectedPage);
    return (
        <div>
            <div className="navBar">
                <nav>
                    <h1 className="logo">Singularity</h1>
                    <div className="tags">
                        <ol>
                            <li className={selectedPage==="Home"?"activeLink":"unActiveLink"}><Link to='/Home'>Home </Link></li>
                            <li className={selectedPage==="Questions"?"activeLink":"unActiveLink"}><Link to='/Answer'>Answer</Link></li>
                            <li className={selectedPage==="Explore"?"activeLink":"unActiveLink"}><Link to='/Explore'>#My school</Link></li>
                        </ol>
                    </div>
                    <SearchInput/>
                    <div className="askQuestionWrapper">
                        <Button id="askQuestionButton" onClick={()=>toggleAskQuestionMode(!askQuestionMode)}>
                            <AddBoxOutlinedIcon/><span>Question</span>
                        </Button>
                        <Link to='/addArticle'>
                            <Button id="postArticleButton">
                                <AddBoxOutlinedIcon/><span>Article</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="accountIcon">
                        <a href="/Profile/1"><AccountCircleIcon/></a>
                    </div>
                    <div className="logOut">
                        <Button onClick={signOut}>Log out </Button>
                    </div>
                </nav>
            </div>
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
        </div>)
};
export default Navigator;