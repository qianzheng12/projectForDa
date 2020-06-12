import React, {Fragment} from 'react'
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import Dropdown from "react-dropdown";
import {degreeYearRange} from "../../utility/dateFixture";

const NeedTutoringPageThree = () =>  {


    return (
        <Fragment>
            <h1>Tutoring Post</h1>
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
                    <Button>Submit</Button>
                </form>
            )}
            </Formik>

        </Fragment>)
}

export default NeedTutoringPageThree;