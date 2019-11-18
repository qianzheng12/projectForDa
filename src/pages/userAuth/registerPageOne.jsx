import React, {useState} from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import './registerPage.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import yearRange, {calculateDays, monthRange, standardDays} from "../utility/dateFixture";
import {Formik} from "formik";

const RegisterPageOne = ({goToNextPage}) => {
    const [dayRange, setDayRange] = useState(standardDays);
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const selectYear = (year) => {
        console.log(year.label % 4);
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
        console.log(day);
        setSelectedDay(day);
    };
    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if(values.confirmPassword !== values.password){
                    errors.confirmPassword = 'Confirm password doesn\'t match password';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                goToNextPage()
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

                        <div className="signUpHeader">
                            <h1>SIGN UP</h1>
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
                        <div className="signUpInput">
                            <input required type="password"
                                   name="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password} placeholder="Password:"
                                   id="fullLongInput"/>
                        </div>
                        <div className="signUpInput">
                            <input required type="password"
                                   name="confirmPassword"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.confirmPassword}
                                   placeholder="Confirm Password:"
                                   id="fullLongInput"/>
                            <h3>{errors.confirmPassword}</h3>
                        </div>
                        <div className="CAPTCHA">
                            <ReCAPTCHA
                                sitekey="6Le4X8IUAAAAAI7ZHhumwZnpviYsW9AvtDPIlx63"
                            />
                        </div>
                        <div className="toS">
                            <input required type="checkbox"/> toS
                        </div>
                        <div className="nextSignUpPageButton">
                            <button type="submit">Next</button>
                        </div>

                    </div>
                </form>
            )}
        </Formik>


    );
};

export default RegisterPageOne;