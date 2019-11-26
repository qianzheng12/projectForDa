import React, {useState} from 'react'
import './registerPage.css'
import {Formik} from "formik";

const RegisterPageOne = ({submit}) => {
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
        <div/>
    );
};

export default RegisterPageOne;