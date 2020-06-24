import React, {useEffect, useRef, useState} from 'react'
import './TutorialPage.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from "@material-ui/core/Button";
import NewTutorialPostsPage from "./NewTutorialPostsPage";
import Checkbox from '@material-ui/core/Checkbox';
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_TUTORING_POSTS, SEARCH_TUTORING_POSTS} from "../graphQL/tutoringQuery";
import MyTutorPostsPage from "./MyTutorPostsPage";
import MyTasksPage from "./MyTasksPage";

const TutorialPage = ({setSelectedPage, setPopUpWindowType, setApplyTutorPost, me, openSpecificUserWindow, setPopUpCallBackFunction}) => {
    const [posts, setPosts] = useState([]);
    const [selectedSubPage, setSelectedSubPage] = useState('New');
    const [selectedTopic, setSelectTopic] = useState([]);
    const [renewPosts, setRenewPosts] = useState(true);
    const [loadingMoreData, setLoadingMoreData] = useState(false);
    const [searchString, setSearchString] = useState('');
    const wrapperRef = useRef(null);

    const getNavItemBackground = (tagName) => {
        return selectedSubPage === tagName ? {background: '#3F4951', color: "white"} : {}
    };
    const [getFeedTutoringPosts, {error, data}] = useLazyQuery(GET_TUTORING_POSTS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setLoadingMoreData(false);
            const {tutorPostFeed} = data;
            if (renewPosts) {
                setPosts(tutorPostFeed);
            } else {
                setPosts([...posts, ...tutorPostFeed]);
            }

        }
    });

    const [searchTutoringPostsQuery, {error: searchTutorError, data: searchTutorData}] = useLazyQuery(SEARCH_TUTORING_POSTS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setLoadingMoreData(false);
            const {searchTutorPost} = searchTutorData;
            if (renewPosts) {
                setPosts(searchTutorPost);
            } else {
                setPosts([...posts, ...searchTutorPost]);
            }
        }
    });

    const applyTutoringPost = (post) => {
        if (me.tutorCard) {
            setPopUpWindowType('applyTutoringPost');
            setApplyTutorPost(post);
        } else {
            setPopUpWindowType("iCanTeach")
        }
    };

    const searchTutoringPosts = (input) => {
        setRenewPosts(true);
        setSearchString(input);
        const topics = selectedTopic.length === 0 ? null : selectedTopic;
        if (input.length === 0) {
            getFeedTutoringPosts({variables: {lastOffset: 0, topics}});
        } else {
            searchTutoringPostsQuery({variables: {searchString: input, lastOffset: 0, topics}})
        }
    };

    const selectTopic = (id) => {
        setRenewPosts(true);
        let topicsAfterSelection;
        if (!selectedTopic.find(topic => topic === id)) {
            topicsAfterSelection = [...selectedTopic, id]
        } else {
            topicsAfterSelection = selectedTopic.filter(topic => topic !== id)
        }
        const topics = topicsAfterSelection.length === 0 ? null : topicsAfterSelection;
        if (searchString.length > 0) {
            searchTutoringPostsQuery({variables: {searchString, lastOffset: 0, topics}})
        } else {
            getFeedTutoringPosts({variables: {lastOffset: 0, topics}})
        }
        setSelectTopic(topicsAfterSelection);
    };

    const getMoreTutorPosts = () => {
        setRenewPosts(false);
        if (loadingMoreData) {
            return;
        }
        const topics = selectedTopic.length === 0 ? null : selectedTopic;
        if (searchString.length > 0) {
            searchTutoringPostsQuery({variables: {searchString, lastOffset: posts.length, topics}})
        } else {
            getFeedTutoringPosts({variables: {lastOffset: posts.length, topics}})
        }
        setLoadingMoreData(true);


    };
    const handleScroll = () => {
        if (wrapperRef.current.scrollHeight - wrapperRef.current.scrollTop - wrapperRef.current.clientHeight > 0) return;
        getMoreTutorPosts()
    };

    useEffect(() => {
        getFeedTutoringPosts();
    }, []);

    if (error || searchTutorError) return <div/>;
    setSelectedPage("Tutoring");
    return (
        <div className="homePage" ref={wrapperRef} onScroll={handleScroll}>
            <div className="homePageContent">
                <div className="feedAnswers">
                    <div className="tutorialPageHeader">
                        <ul className="tutorialNav">
                            <li style={getNavItemBackground('New')} onClick={() => {
                                setSelectedSubPage('New')
                            }}>New
                            </li>
                            <li style={getNavItemBackground('My Posts')} onClick={() => {
                                setSelectedSubPage('My Posts')
                            }}>My Posts
                            </li>
                            <li style={getNavItemBackground('My Tasks')} onClick={() => {
                                setSelectedSubPage('My Tasks')
                            }}>My Tasks
                            </li>
                        </ul>
                        {selectedSubPage === 'New' && <div className="tutorialSearch">
                            <input onChange={(e) => searchTutoringPosts(e.target.value)} value={searchString}/>
                            <SearchOutlinedIcon/>
                        </div>}
                    </div>
                    {selectedSubPage === 'New' &&
                    <NewTutorialPostsPage posts={posts} setPopUpWindowType={applyTutoringPost} myId={me.id}
                                          setPopUpCallBackFunction={setPopUpCallBackFunction}/>}
                    {selectedSubPage === 'My Posts' &&
                    <MyTutorPostsPage openSpecificUserWindow={openSpecificUserWindow}/>}
                    {selectedSubPage === 'My Tasks' && <MyTasksPage/>}
                </div>
                <div className="tutorialPageRightHandSide">
                    <div className="tutorialPageActions">
                        <Button id="iNeedTutorialButton" onClick={() => setPopUpWindowType("iNeedTutoring")}>I need
                            tutoring</Button>
                        <Button id="iCanTutorButton" onClick={() => setPopUpWindowType("iCanTeach")}>I can
                            teach</Button>
                    </div>
                    {selectedSubPage === 'New' && <div className="tutorialPagePostsTopicFilter">
                        <div className="tutorialPageTopicFilterHeader">
                            <h1>Filters</h1>
                        </div>
                        <ul>
                            {me.followedTopics.map(topic => (
                                <li><p>#{topic.name}</p> <Checkbox onClick={() => {
                                    selectTopic(topic.id)
                                }} id="topicFilterCheckBox"/></li>
                            ))}
                        </ul>
                    </div>}
                </div>
            </div>
        </div>

    )
};

export default TutorialPage;