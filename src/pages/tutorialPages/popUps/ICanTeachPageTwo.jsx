import React, {Fragment, useState} from 'react'
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import Dropdown from "react-dropdown";
import {degreeYearRange} from "../../utility/dateFixture";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_TUTORING_CARD} from "../../graphQL/tutoringMutation";

const ICanTeachPageTwo = ({goToNextPage}) => {
    const [degreeYear , setDegreeYear] = useState({value: "Undergraduate 2nd year", label: "Undergraduate 2nd year"});
    const [postTutoringPost] = useMutation(CREATE_TUTORING_CARD);
    console.log(degreeYear);
    return (
        <Fragment>
            <div className="tutorCardHeader">
            <h1>Tutor Card</h1>
            <p>Tutor card includes information like your skill, academic background, and unique style of tutoring. Once you set up your first Tutor Card here,
                everytime you apply to a tutoring post, this card will automatically fill in the application. You can always change your Tutor Card information under your profile settings.</p>
            </div>
            <Formik
                initialValues={{major: '', skills:'',timeAvailability:'', preferredSoftware:'',details:''}}
                onSubmit={(values) => {
                    console.log({...values, year:degreeYear.value});
                    postTutoringPost({variables:{...values, year:degreeYear.value}}).then(()=>{
                        goToNextPage();
                    });
                }}
            >{({
                   values,
                   handleChange,
                   handleSubmit,
               }) => (
                <form onSubmit={handleSubmit} autocomplete="off" >
                    <h2>What year are you in? *</h2>
                    <Dropdown required options={degreeYearRange}
                              value={degreeYear}  onChange={(data)=>{setDegreeYear(data)}}
                              id="majorYearPicker" placeholder={degreeYearRange[0]}/>
                    <h2>What's your major/research direction?*</h2>
                    <input
                        required
                        onChange={handleChange}
                        value={values.major}
                        name="major"
                        id="majorInput" />
                    <h2>Skills and abilities*</h2>
                    <textarea
                        required
                        onChange={handleChange}
                        value={values.skills}
                        name="skills"
                        id="skillsInput" />
                    <h2>Time availability*</h2>
                    <input
                        required
                        onChange={handleChange}
                        value={values.timeAvailability}
                        name="timeAvailability"
                        id="timeAvailabilityInput" />
                    <h2>What software do you prefer to use?</h2>
                    <input
                        onChange={handleChange}
                        value={values.preferredSoftware}
                        name="preferredSoftware"
                        placeholder=" eg. Skype or Zoom"
                        id="preferredSoftwareInput" />
                    <h2>More details</h2>
                    <textarea
                        onChange={handleChange}
                        value={values.details}
                        name="details"
                        id="detailsInput" />
                    <Button type="submit" style={{marginLeft:'0'}}>Next</Button>
                </form>
            )}
            </Formik>

        </Fragment>)
}

export default ICanTeachPageTwo;