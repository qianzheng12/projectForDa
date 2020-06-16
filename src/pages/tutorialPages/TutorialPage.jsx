import React, {useEffect, useState} from 'react'
import './TutorialPage.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from "@material-ui/core/Button";
import NewTutorialPostsPage from "./popUps/NewTutorialPostsPage";
import Checkbox from '@material-ui/core/Checkbox';
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_TUTORING_POSTS, SEARCH_TUTORING_POSTS} from "../graphQL/tutoringQuery";

const TutorialPage = ({setSelectedPage,setPopUpWindowType, setApplyTutorPostId}) => {
    const[posts, setPosts] = useState([]);

    const[followedTopics , setFollowedTopics] = useState([]);
    const[tutorCard , setTutorCard] = useState(undefined);

    const [getFeedTutoringPosts, {error, data}] = useLazyQuery(GET_TUTORING_POSTS,{
        fetchPolicy: "network-only",
        onCompleted: ()=>{
            const {tutorPostFeed,me:{followedTopics, tutorCard}} = data;
            setPosts(tutorPostFeed);
            setTutorCard(tutorCard);
            setFollowedTopics(followedTopics);
        }
    });

    const [searchTutoringPostsQuery, {error:searchTutorError, data:searchTutorData}] = useLazyQuery(SEARCH_TUTORING_POSTS,{
        fetchPolicy: "network-only",
        onCompleted: ()=>{
            const {searchTutorPost} = searchTutorData;
            setPosts(searchTutorPost);
        }
    });

    const applyTutoringPost = (postId) => {
        if(tutorCard){
            setPopUpWindowType('applyTutoringPost');
            setApplyTutorPostId(postId);
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
                            <li>New</li>
                            <li>My Posts</li>
                            <li>My Tasks</li>
                        </ul>
                        <div className="tutorialSearch">
                            <input onChange={(e)=>searchTutoringPosts(e.target.value)}/>
                            <SearchOutlinedIcon />
                        </div>
                    </div>
                    <NewTutorialPostsPage  posts={posts} setPopUpWindowType={applyTutoringPost} setApplyTutorPostId={setApplyTutorPostId}/>
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