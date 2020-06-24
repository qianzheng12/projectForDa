import React from 'react'
import TutorialPostCard from "./TutorialPostCard";

const NewTutorialPostsPage = ({posts, setPopUpWindowType, myId, setPopUpCallBackFunction}) => {
    return (
        <div className="tutorialPosts">
            {posts.map(post => (
                <TutorialPostCard post={post} setPopUpWindowType={setPopUpWindowType} myPost={post.user.id === myId}
                                  setPopUpCallBackFunction={setPopUpCallBackFunction}/>
            ))}
        </div>
    )
};

export default NewTutorialPostsPage;