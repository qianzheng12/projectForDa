import React, {useState} from "react";
import './profilePage.css'
import ProfileCard from "./profileCard";
import ProfileHomePage from "./profileHomePage";
import ProfileBookmarkPage from "./profileBookmarkPage";
import ProfileFollowingPage from "./profileFollowingPage";
import ProfileFollowingTopic from "./propfileFollowingTopic";
import ProfileEducationPage from "./profileEducationPage";
import ProfileQuestionsPage from "./profileQuestionsPage";
import ProfileSettingPage from "./profileSettingPage";
const ProfilePage = props => {
    const navigatorTopics = ['Profile', 'Education', 'My bookmarks', 'My following', 'My topics', 'My questions','My answers','My articles',"Settings"];
    const [selectedTopic, setSelectedTopic] = useState("Profile");
    const selectTopic = (topic) => {
        setSelectedTopic(topic)
    };

    return (
        <div className="profilePageWrapper">
            <div className="profileWrapper">
                <div className="profileHeader">
                    <ProfileCard/>
                </div>
                <div className="profileContent">
                    <div className="profileNavigator">
                        <ul>
                            {navigatorTopics.map(topic => (
                                <li style={{background:selectedTopic===topic?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic(topic)}}>{topic}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="profileSection">
                        {(selectedTopic === 'Profile') && <ProfileHomePage/>}
                        {(selectedTopic === 'Education') && <ProfileEducationPage/>}
                        {(selectedTopic === 'My bookmarks') && <ProfileBookmarkPage/>}
                        {(selectedTopic === 'My following') && <ProfileFollowingPage/>}
                        {(selectedTopic === 'My topics') && <ProfileFollowingTopic/>}
                        {(selectedTopic === 'My questions') && <ProfileQuestionsPage/>}
                        {(selectedTopic === 'My answers') && <ProfileQuestionsPage/>}
                        {(selectedTopic === 'My articles') && <ProfileQuestionsPage/>}
                        {(selectedTopic === 'Settings') && <ProfileSettingPage/>}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ProfilePage;