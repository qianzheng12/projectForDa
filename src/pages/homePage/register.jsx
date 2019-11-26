import React, {useState} from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import RegisterPageOne from './registerPageOne'
import RegisterPageTwo from './registerPageTwo'
import './registerPage.css'
import { Auth } from 'aws-amplify';
const RegisterPage = () => {
    const [page, setPage] = useState(1);
    const [pastEducations, setPastEducations] = useState([{id:1, university:"",major:"",year:""}]);
    const [firstPageValues, setFirstPageValues] = useState({});
    const goToNextPage = (firstPageValues)=>{
        setFirstPageValues(firstPageValues);
        setPage(2)
    }
    const submit = () => {
        console.log(firstPageValues)
        Auth.signUp({
            username:firstPageValues.email,
            password:firstPageValues.password,
        })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
    console.log(Auth.configure())
    return (
        <div className="registerWrapper">
            {page === 1 &&
            <RegisterPageOne goToNextPage={goToNextPage}/>}
            {page === 2&&<RegisterPageTwo pastEducations={pastEducations}
                                              setPastEducations={setPastEducations}
            submit={submit}/>}}

        </div>
    );
};

export default RegisterPage;