import React from 'react'
import TutoringApplicationContent from "../TutoringApplicationContent";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {APPLY_TUTORING_POST} from "../../graphQL/tutoringMutation";

const TutoringApplicationPopUp = ({ setPopUpWindow,tutorPost}) => {
    const [createApplication] = useMutation(APPLY_TUTORING_POST);

    const applyPost = () => {
        createApplication({variables:{postID:tutorPost.id}}).then(()=>{
            setPopUpWindow(undefined);
        })
    };
    return (
        <div className="TutoringPopUpWrapper" >
            <TutoringApplicationContent tutorPost={tutorPost}/>
            <Button style={{marginBottom:'30px'}} onClick={applyPost}>Apply</Button>
        </div>
    )
};

export default TutoringApplicationPopUp;