import React, {useState} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import SearchInput from "./searchInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Auth } from 'aws-amplify';
import PostPage from "../posts/postPage";

/* 
    Navigation bar for user to navgiate between three components: Home, question, School.
    Also provide the account icon for user to access the account management page and search ability.
*/

const Navigator = ({setGreyOutCover,selectedPage,greyOutCover,me}) => {
    const signOut = () => {
        Auth.signOut()
            .then(data => window.location.reload())
            .catch(err => console.log(err));
    };

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
                        <Button id="askQuestionButton" onClick={()=>setGreyOutCover(!greyOutCover)}>
                            <AddBoxOutlinedIcon/><span>Question</span>
                        </Button>
                        <Link to='/addArticle'>
                            <Button id="postArticleButton">
                                <AddBoxOutlinedIcon/><span>Article</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="accountIcon">
                        <a href={"/Profile/"+me.id}>{me.thumbnail?<img src={me.thumbnail}/>:<AccountCircleIcon/>}</a>
                    </div>
                    <div className="logOut">
                        <Button onClick={signOut}>Log out </Button>
                    </div>
                </nav>
            </div>
        </div>)
};
export default Navigator;