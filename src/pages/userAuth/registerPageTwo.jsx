import React, {useState} from 'react'
import './registerPage.css'
import {Formik} from "formik";

const RegisterPageOne = () => {
    const [pastEducations, setPastEducations] = useState([{id: 1, university: "", major: "", year: ""}]);
    const changePastEducation = (id, field, value) => {
        const copyPastEducations = [...pastEducations];
        switch (field) {
            case "university":
                copyPastEducations.find(x => x.id === id).university = value;
                break;
            case "major":
                copyPastEducations.find(x => x.id === id).major = value;
                break;
            case "year":
                copyPastEducations.find(x => x.id === id).year = value;
                break;
            default:
                break;
        }
        console.log(copyPastEducations);
        setPastEducations(copyPastEducations)
    };
    const addEducation = () => {
        setPastEducations([...pastEducations, {id: pastEducations.length + 1, university: "", major: "", year: ""}])
    };
    return (
        <Formik
            initialValues={{currentUni: '', currentMajor: ''}}

            onSubmit={(values, {setSubmitting}) => {
                console.log(values)
            }}
        >{({
               values,
               handleChange,
               handleSubmit,
           }) => (
            <form onSubmit={handleSubmit}>
                <div className="registerForm">
                    <div className="signUpHeader">
                        <h1>Education</h1>
                    </div>
                    <div className="universityHeader">
                        <h2>Current: </h2>
                    </div>
                    <div className="signUpInput">
                        <input required
                               name="currentUni"
                               onChange={handleChange}
                               value={values.currentUni}
                               placeholder="University/College:"
                               id="fullLongInput"/>
                    </div>
                    <div className="signUpInput">
                        <input required
                               name="currentMajor"
                               onChange={handleChange}
                               value={values.currentMajor}
                               placeholder="Major:"
                               id="major"/>
                    </div>
                    <div className="educationOptionalInput">
                        {pastEducations.map(pastEducation => (
                            <div>

                                <div className="universityHeader">
                                    <h2>Optional: </h2>
                                </div>
                                <div className="signUpInput">
                                    <input
                                        onChange={(event) => changePastEducation(pastEducation.id,
                                            "university", event.target.value)}
                                        value={pastEducation.university}
                                        placeholder="University/College:"
                                        id="fullLongInput"/>
                                </div>
                                <div className="signUpInput">
                                    <input
                                        onChange={(event) => changePastEducation(pastEducation.id,
                                            "major", event.target.value)}
                                        value={pastEducation.major}
                                        placeholder="Major:" id="major"/>
                                </div>
                            </div>
                        ))}
                        <div className="addEducation">
                            <h2 onClick={addEducation}>+ Add</h2>
                        </div>
                        <div className="nextSignUpPageButton">
                            <button type="submit">Submit</button>
                        </div>
                    </div>

                </div>
            </form>
        )}
        </Formik>


    );
};

export default RegisterPageOne;