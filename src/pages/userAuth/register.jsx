import React, {useState} from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import RegisterPageOne from './registerPageOne'
import RegisterPageTwo from './registerPageTwo'
import './registerPage.css'
const RegisterPage = () => {
    const [showFirstPage, setShowFirstPage] = useState(true);
    const [pastEducations, setPastEducations] = useState([{id:1, university:"",major:"",year:""}]);

    const goToNextPage = ()=>{
        setShowFirstPage(!showFirstPage)
    }
    return (
        <div className="registerWrapper">
            {showFirstPage &&
            <RegisterPageOne goToNextPage={goToNextPage}/>}
            {!showFirstPage&&<RegisterPageTwo pastEducations={pastEducations}
                                              setPastEducations={setPastEducations}
                                              toggleFirstPage={goToNextPage}/>}}

        </div>
    );
};

export default RegisterPage;