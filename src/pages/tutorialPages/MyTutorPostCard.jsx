import React, {Fragment} from 'react'
import TutoringApplicationContent from "./TutoringApplicationContent";
import TutorApplicationCard from "./TutorApplicationCard";

const MyTutorPostCard = ({post}) => {
    const {applications} = post;
    return (
        <div className="MyTutorPostCardWrapper">
            <TutoringApplicationContent tutorPost={post}/>
            <div className="tutorsApplicationWrapper">
                <div id="lineBreak"/>
                {(applications.length > 0) &&
                <Fragment>
                    <h1>Tutors:</h1>
                    {post.applications.map(
                        application => (
                            <TutorApplicationCard application={application}/>
                        )
                    )}
                </Fragment>}
            </div>
        </div>
    )
};

export default MyTutorPostCard;