import React from 'react'
import TutoringApplicationContent from "../TutoringApplicationContent";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {APPLY_TUTORING_POST} from "../../graphQL/tutoringMutation";

const TutoringApplicationPopUp = ({postID, setPopUpWindow}) => {
    const [createApplication] = useMutation(APPLY_TUTORING_POST);

    const applyPost = () => {
        createApplication({variables:{postID}}).then(()=>{
            setPopUpWindow(undefined);
        })
    }
    return (
        <div className="TutoringPopUpWrapper" >
            <TutoringApplicationContent/>
            <Button style={{marginBottom:'30px'}} onClick={applyPost}>Apply</Button>
        </div>
    )
};

export default TutoringApplicationPopUp;