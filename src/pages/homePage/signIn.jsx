import React from 'react'
import './registerPage.css'
import { Auth } from 'aws-amplify';
import {Formik} from "formik";
import './signIn.css';
import Button from "@material-ui/core/Button";
const SignInPage = () => {
    let imgUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/566dfa56-2fa2-4aa3-b4d1-e278d836364b/d6fwaio-5cc22ece-335c-4d52-a80c-33590b67e760.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU2NmRmYTU2LTJmYTItNGFhMy1iNGQxLWUyNzhkODM2MzY0YlwvZDZmd2Fpby01Y2MyMmVjZS0zMzVjLTRkNTItYTgwYy0zMzU5MGI2N2U3NjAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.u6pya3DeJ-T5ECifRffYrqEBWYFQ1T9qgvy-MdftCOA'
    const signIn = (values) => {
        Auth.signIn({
            username:values.userEmail,
            password:values.password,
        }).then(user => {
            console.log(user);
            window.location.reload();
        })
            .catch(err => {
                console.log(err)
                alert(err.message)
            });
    }
    return (
            <div className="loginFormWrapper">
                <Formik
                    initialValues={{userEmail: '', password: ''}}

                    onSubmit={(values, {setSubmitting}) => {
                        console.log(values)
                        signIn(values);
                    }}
                >{({
                       values,
                       handleChange,
                       handleSubmit,
                   }) => (
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Email"
                        name="userEmail"
                        value={values.userEmail}
                        onChange={handleChange}/>
                        <input placeholder="Password"
                               type="password"
                               name="password"
                               value={values.password}
                               onChange={handleChange}/>
                        <Button type="submit">sign in</Button>
                    </form>
                )}
                </Formik>
            </div>
    );
};

export default SignInPage;