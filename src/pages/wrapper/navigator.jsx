import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import SearchInput from "./searchInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { Auth } from 'aws-amplify';

/* 
    Navigation bar for user to navgiate between three components: Home, question, School.
    Also provide the account icon for user to access the account management page and search ability.
*/

const Navigator = ({setGreyOutCover,selectedPage,greyOutCover,me}) => {
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const signOut = () => {
        Auth.signOut()
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="navBar">
                <nav>
                    <Link to={"/home"}><h1 className="logo">singularity</h1></Link>
                    <div className="tags">
                        <ol>
                            <li className={selectedPage==="Home"?"activeLink":"unActiveLink"}><Link to='/Home'>Home</Link></li>
                            <li className={selectedPage==="Answer"?"activeLink":"unActiveLink"}><Link to='/Answer'>Answer</Link></li>
                            <li className={selectedPage==="MySchool"?"activeLink":"unActiveLink"}><Link to='/MySchool'>My school</Link></li>
                        </ol>
                    </div>
                    <SearchInput/>
                    <div className="askQuestionWrapper">
                        <Button id="askQuestionButton" onClick={()=>setGreyOutCover(!greyOutCover)}>
                            <AddBoxRoundedIcon/><span>Question</span>
                        </Button>
                        <Link to='/addArticle'>
                            <Button id="postArticleButton">
                                <AddBoxRoundedIcon/><span>Article</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="accountIcon" onClick={()=>{setToolWindowOpen(!toolWindowOpen)}}>
                        {me.thumbnail?<img src={me.thumbnail}/>:<AccountCircleIcon/>}
                        {toolWindowOpen &&
                        <div className="wrapperToolWindow">
                            <a href={'/Profile/'+me.id}>
                            <div className="wrapperToolWindowSubSection">
                               <span>{me.firstName + me.lastName}</span>
                            </div></a>
                            <div className="wrapperToolWindowSubSection">
                                <span>Notification</span>
                            </div>
                            <div onClick={signOut} className="wrapperToolWindowSubSection">
                                <span style={{color: "#FF9240"}}>Logout</span>
                            </div>
                        </div>}
                    </div>
                </nav>
            </div>
        </div>)
};
export default Navigator;