import React, {useEffect, useState} from 'react'
import './TutorialPage.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from "@material-ui/core/Button";
import NewTutorialPostsPage from "./NewTutorialPostsPage";
import Checkbox from '@material-ui/core/Checkbox';
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_TUTORING_POSTS, SEARCH_TUTORING_POSTS} from "../graphQL/tutoringQuery";
import MyTutorPostsPage from "./MyTutorPostsPage";

const TutorialPage = ({setSelectedPage,setPopUpWindowType, setApplyTutorPost, me}) => {
    const[posts, setPosts] = useState([]);
    const[myPosts, setMyPosts] = useState([]);
    const[selectedSubPage, setSelectedSubPage] = useState('My Posts');
    const[followedTopics , setFollowedTopics] = useState([]);
    const[tutorCard , setTutorCard] = useState(undefined);

    const getNavItemBackground = (tagName) => {
        return selectedSubPage === tagName ? {background:'#3F4951', color:"white"} : {}
    };
    const [getFeedTutoringPosts, {error, data}] = useLazyQuery(GET_TUTORING_POSTS,{
        fetchPolicy: "network-only",
        onCompleted: ()=>{
            const {tutorPostFeed,me:{followedTopics, tutorCard, myTutorPosts}} = data;
            setPosts(tutorPostFeed);
            setTutorCard(tutorCard);
            setFollowedTopics(followedTopics);
            setMyPosts(myTutorPosts);
        }
    });

    const [searchTutoringPostsQuery, {error:searchTutorError, data:searchTutorData}] = useLazyQuery(SEARCH_TUTORING_POSTS,{
        fetchPolicy: "network-only",
        onCompleted: ()=>{
            const {searchTutorPost} = searchTutorData;
            setPosts(searchTutorPost);
        }
    });

    const applyTutoringPost = (post) => {
        if(tutorCard){
            setPopUpWindowType('applyTutoringPost');
            setApplyTutorPost(post);
        }
        else{
            setPopUpWindowType("iCanTeach")
        }
    };

    const searchTutoringPosts = (input) => {
        if(input.length===0){
            getFeedTutoringPosts();
        }
        else{
            searchTutoringPostsQuery({variables:{searchString:input}})
        }
    };
    useEffect(()=>{
        getFeedTutoringPosts();
    },[]);

    if (error || searchTutorError) return <div/>;
    setSelectedPage("Tutoring");
    return (
        <div className="homePage">
            <div className="homePageContent" >
                <div className="feedAnswers">
                    <div className="tutorialPageHeader">
                        <ul className="tutorialNav">
                            <li style={getNavItemBackground('New')} onClick={()=>{setSelectedSubPage('New')}}>New</li>
                            <li style={getNavItemBackground('My Posts')} onClick={()=>{setSelectedSubPage('My Posts')}}>My Posts</li>
                            <li style={getNavItemBackground('My Tasks')} onClick={()=>{setSelectedSubPage('My Tasks')}}>My Tasks</li>
                        </ul>
                        <div className="tutorialSearch">
                            <input onChange={(e)=>searchTutoringPosts(e.target.value)}/>
                            <SearchOutlinedIcon />
                        </div>
                    </div>
                    {selectedSubPage ==='New' &&<NewTutorialPostsPage  posts={posts} setPopUpWindowType={applyTutoringPost} myId={me.id}/>}
                    {selectedSubPage ==='My Posts' && <MyTutorPostsPage posts={myPosts}/>}

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
                            {followedTopics.map( topic =>(
                                <li><p>#{topic.name}</p> <Checkbox id="topicFilterCheckBox"/></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default TutorialPage;