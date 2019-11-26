import React from 'react'
import {Link} from 'react-router-dom'
import SearchInput from "./searchInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Auth } from 'aws-amplify';
const Navigator = props => {
    const {askQuestionMode,toggleAskQuestionMode,selectedPage} = props;
    const signOut = () => {
        Auth.signOut()
            .then(data => window.location.reload())
            .catch(err => console.log(err));
    };
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
                        <AddBoxOutlinedIcon/><Link to='/addArticle'><span>Article</span></Link>
                    </Button>
                </div>
                <div className="accountIcon">
                    <AccountCircleIcon/>
                </div>
                <div className="logOut">
                    <Button onClick={signOut}>Log out </Button>
                </div>

            </nav>

        </div>)
};
export default Navigator;