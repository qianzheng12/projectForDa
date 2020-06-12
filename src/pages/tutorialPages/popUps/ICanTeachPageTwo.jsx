import React, {Fragment} from 'react'
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import Dropdown from "react-dropdown";
import {degreeYearRange} from "../../utility/dateFixture";

const ICanTeachPageTwo = ({goToNextPage}) => {


    return (
        <Fragment>
            <div className="tutorCardHeader">
            <h1>Tutor Card</h1>
            <p>Tutor card includes information like your skill, academic background, and unique style of tutoring. Once you set up your first Tutor Card here,
                everytime you apply to a tutoring post, this card will automatically fill in the application. You can always change your Tutor Card information under your profile settings.</p>
            </div>
            <Formik
                initialValues={{title: '', anonymouslyCheck: false,description:'', mySchool:false}}
            >{({
                   values,
                   handleChange,
                   handleSubmit,
               }) => (
                <form onSubmit={handleSubmit} autocomplete="off" >
                    <h2>What year are you in? *</h2>
                    <Dropdown required options={degreeYearRange}
                              id="majorYearPicker" placeholder={degreeYearRange[0]}/>
                    <h2>What's your major/research direction?*</h2>
                    <input
                        required
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        id="titleInput" />
                    <h2>What is your tutoring feature?*</h2>
                    <textarea
                        required
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        id="titleInput" />
                    <h2>What software do you prefer to use?</h2>
                    <input
                        required
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        placeholder=" eg. Skype or Zoom"
                        id="titleInput" />
                    <h2>More details</h2>
                    <textarea
                        required
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        id="titleInput" />
                </form>
            )}
            </Formik>
            <Button  style={{marginLeft:'0'}} onClick={goToNextPage}>Next</Button>
        </Fragment>)
}

export default ICanTeachPageTwo;