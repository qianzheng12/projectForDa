import React from 'react'
import TutorialPostCard from "./TutorialPostCard";

const NewTutorialPostsPage = ({posts, setPopUpWindowType,myId}) => {
    return (
        <div className="tutorialPosts">
            {posts.map(post=>(
                <TutorialPostCard post={post} setPopUpWindowType={setPopUpWindowType} myPost={post.user.id === myId}/>
            ))}
        </div>
    )
};

export default NewTutorialPostsPage;