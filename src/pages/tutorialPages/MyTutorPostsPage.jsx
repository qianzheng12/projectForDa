import React from 'react'
import MyTutorPostCard from "./MyTutorPostCard";
import './MyTutorPosts.css'
const MyTutorPostsPage = ({posts}) => {

    return (
        <div className="MyTutorPostsWrapper">
            {
                posts.map (post=>
                    (<MyTutorPostCard post={post}/>)
                )
            }

        </div>
    )
};

export default MyTutorPostsPage;