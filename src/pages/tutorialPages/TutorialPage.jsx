import React  from 'react'
import './TutorialPage.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import TutorialPostCard from "./TutorialPostCard";
import Button from "@material-ui/core/Button";
import NewTutorialPostsPage from "./popUps/NewTutorialPostsPage";
import Checkbox from '@material-ui/core/Checkbox';

const TutorialPage = ({setSelectedPage,setPopUpWindowType}) => {
    setSelectedPage("Tutoring");
    return (
        <div className="homePage">
            <div className="homePageContent" >
                <div className="feedAnswers">
                    <div className="tutorialPageHeader">
                            <ul className="tutorialNav">
                                <li>New</li>
                                <li>My Posts</li>
                                <li>My Tasks</li>
                            </ul>
                        <div className="tutorialSearch">
                                <input/>
                                <SearchOutlinedIcon />
                        </div>
                    </div>
                <NewTutorialPostsPage/>
                </div>
                <div className="tutorialPageRightHandSide">
                    <div className="tutorialPageActions">
                        <Button id="iNeedTutorialButton" onClick={()=>setPopUpWindowType("iNeedTutoring")}>I need tutoring</Button>
                        <Button id="iCanTutorButton" onClick={()=>setPopUpWindowType("iCanTeach")}>I can teach</Button>
                    </div>
                    <div className="tutorialPagePostsTopicFilter">
                        <div className="tutorialPageTopicFilterHeader">
                            <h1>Filters</h1>
                        </div>
                        <ul>
                            {[1,2,3,4].map(()=>(
                                <li>#Topic <Checkbox id="topicFilterCheckBox"/></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default TutorialPage;