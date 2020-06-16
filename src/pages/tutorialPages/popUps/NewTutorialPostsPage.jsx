import React from 'react'
import TutorialPostCard from "../TutorialPostCard";

const NewTutorialPostsPage = ({posts, setPopUpWindowType}) => {
    console.log(posts)
    return (
        <div className="tutorialPosts">
            {posts.map(post=>(
                <TutorialPostCard post={post} setPopUpWindowType={setPopUpWindowType}/>
            ))}
        </div>
    )
}

export default NewTutorialPostsPage;