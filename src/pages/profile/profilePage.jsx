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
import {useQuery} from "@apollo/react-hooks";
import {USER_INFORMATION} from "../graphQL/userQuery";
const ProfilePage = props => {
    const navigatorTopics = ['Profile', 'Education', 'My bookmarks', 'My following', 'My topics', 'My questions','My answers','My articles',"Settings"];
    const {loading, error, data} = useQuery(USER_INFORMATION);
    const [selectedTopic, setSelectedTopic] = useState("Profile");
    if(loading) return <div/>
    if(error) return <div/>
    const {me} = data;
    const selectTopic = (topic) => {
        setSelectedTopic(topic)
    };

    return (
        <div className="profilePageWrapper">
            <div className="profileWrapper">
                <div className="profileHeader">
                    <ProfileCard userInformation={me}/>
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
                        {(selectedTopic === 'My questions') && <ProfileQuestionsPage type={"question"} data={me.questions}/>}
                        {(selectedTopic === 'My answers') && <ProfileQuestionsPage type={"answer"} data={me.answers}/>}
                        {(selectedTopic === 'My articles') && <ProfileQuestionsPage type={"article"} data={me.questions}/>}
                        {(selectedTopic === 'Settings') && <ProfileSettingPage/>}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ProfilePage;