import React, {useState} from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import './registerPage.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import yearRange, {calculateDays, monthRange, standardDays,degreeYearRange} from "../utility/dateFixture";
import {Formik} from "formik";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import Button from "@material-ui/core/Button";

/*
    Page for user to submit their basic information like : Names, email, education details.
    After user submit the form, information will be sent to Amplify Cognito server along with basic information,
    basic information will be distributed to database in back end. 
    Note: Use formik library for validation, might be overkill in this case.
*/
const RegisterPageOne = ({submit}) => {
    const [dayRange, setDayRange] = useState(standardDays);
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [selectedMajorYear, setSelectedMajorYear] = useState();
    const [showPassword , setShowPassword] = useState(false);
    const selectYear = (year) => {
        setSelectedYear(year);
        if (selectedMonth) {
            setDayRange(calculateDays(year.value, selectedMonth.value));
        }
    };
    const selectMonth = (month) => {
        setSelectedMonth(month);
        if (selectedYear) {
            setDayRange(calculateDays(selectedYear.value, month.value));
        }
    };
    const selectDay = (day) => {
        setSelectedDay(day);
    };
    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: '', password: '', university:'',major:'',degreeYear:''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values) => {
                submit(values.email,values.password,values.firstName,values.lastName,values.university,values.major,setSelectedMajorYear);
            }}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className="registerForm">

                        <div className="authWrapperHeader">
                            <img width="24px" height="42px" src={require('../../resource/icon.png')}/>
                            <span>Singularity</span>
                        </div>
                        <div className="signUpInput">
                            <input required
                                   name="firstName"
                                   onChange={handleChange}
                                   value={values.firstName}
                                   placeholder="First Name" id="firstName"/>
                            <input required name="lastName"
                                   onChange={handleChange}
                                   value={values.lastName}
                                   placeholder="Last Name" id="lastName"/>
                        </div>
                        <div className="signUpInput">
                        <Dropdown required options={monthRange} onChange={selectMonth} value={selectedMonth}
                                  className="monthPicker" placeholder="Month"/>
                        <Dropdown required options={dayRange} onChange={selectDay} value={selectedDay} className="dayPicker"
                                  placeholder="Day"/>
                        <Dropdown required options={yearRange} onChange={selectYear} value={selectedYear}
                                  className="yearPicker" placeholder="Year"/>
                    </div>
                        <div className="signUpInput">
                            <input required type="email"
                                   name="email"
                                   onChange={handleChange}
                                   value={values.email} placeholder="Email:" id="fullLongInput"/>
                            <h3>{errors.email}</h3>
                        </div>
                        <div className="passwordInput">
                            <input required type={!showPassword ? "password":""}
                                   name="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password} placeholder="Password:"
                                   id="fullLongInput"/>
                            <VisibilityOffOutlinedIcon onMouseDown={()=>{setShowPassword(true)}}
                                                       onMouseUp={()=>{setShowPassword(false)}}
                            />
                        </div>
                        <div className="signUpInput">
                            <input required type=""
                                   name="university"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.university}
                                   placeholder="Current university/College"
                                   id="university"/>
                        </div>
                        <div className="majorInput">
                            <input required type=""
                                   name="major"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.major}
                                   placeholder="Major"
                                   id="fullLongInput"/>
                        </div>
                        <div className="signUpInput">
                        <Dropdown required options={degreeYearRange} onChange={(data)=>{setSelectedMajorYear(data)}} value={selectedMajorYear}
                                  className="majorYearPicker" placeholder={degreeYearRange[0]}/>
                        </div>
                        <div className="toS">
                            <input required type="checkbox"/> ToS
                        </div>
                        <div className="nextSignUpPageButton">
                            <Button type="submit">Next</Button>
                        </div>

                    </div>
                </form>
            )}
        </Formik>


    );
};

export default RegisterPageOne;