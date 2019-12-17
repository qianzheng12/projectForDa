import React, {useState} from "react";
import './profileHomePage.css'
import DraggableList from "./DraggableList";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Formik} from "formik";
import CloseIcon from '@material-ui/icons/Close';
import TextInputArea from "../askQuestion/textInputArea";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
const ProfileEducationPage = props => {
    const [addMode, setAddMode] = useState(false);
    return (
        <div className="profileHomePageWrapper">
            <div className="profileHomePageHeader">
                <h1>Past education:</h1>
                <p>I think you know what goes here. No need for further description.</p>
            </div>
            <div className="profileHomePageContent">
                <div className="addListElementSection">
                    {!addMode &&<div className="addListElement" onClick={()=>setAddMode(true)}>
                        <AddCircleOutlineIcon/>
                        <span>Add</span>
                    </div>}
                    {addMode&&
                    <Formik
                        initialValues={{title: '', anonymouslyCheck: false,description:'', mySchool:false}}

                        onSubmit={(values, {setSubmitting}) => {

                        }}
                    >{({
                           values,
                           handleChange,
                           handleSubmit,
                       }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="addListArea">
                                <CloseIcon  className="closeAddProfilePrompt" onClick={()=>{setAddMode(false)}}/>
                                <div className="profileInputArea">
                                    <h1>Prompt:</h1>
                                    <input placeholder="e.g. dog or cat?"/>
                                </div>

                                <div className="profileInputArea">
                                    <h1>Response:</h1>
                                    <input placeholder="e.g. dog"/>
                                </div>
                                <div className="addProfilePrompt">
                                    <Button type="submit"><span>Save</span></Button>
                                </div>
                            </div>
                        </form>
                    )}
                    </Formik>}
                </div>
                <DraggableList/>
            </div>
        </div>
    )
};
export default ProfileEducationPage;