import {useState} from "react";

export const useVotesState = (upvote,downvote)=>{
     const [thumbUp, setThumbUp] = useState(false);
    const [thumbDown, setThumbDown] = useState(false);
    const [upVotes, setUpVotes] = useState(100);


    const toggleThumbUp = () => {
        if (thumbDown) {
            setUpVotes(upVotes + 2);
            setThumbDown(false)
        } else {
            if (thumbUp) {
                setUpVotes(upVotes - 1)
            } else {
                setUpVotes(upVotes + 1)
            }
        }
        setThumbUp(!thumbUp)
    };

    const toggleThumbDown = () => {
        if (thumbUp) {
            setUpVotes(upVotes - 2);
            setThumbUp(false);
        } else {
            if (!thumbDown) {
                setUpVotes(upVotes - 1);
            } else {
                setUpVotes(upVotes + 1);
            }
        }
        setThumbDown(!thumbDown);

    };

    return {thumbUp,thumbDown,upVotes,toggleThumbUp,toggleThumbDown};
};
