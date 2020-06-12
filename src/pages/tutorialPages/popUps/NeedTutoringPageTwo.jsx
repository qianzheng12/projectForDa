import React, {Fragment} from 'react'
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

const NeedTutoringPageTwo = ({goToNextPage}) => {


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
                        <h2>Title:</h2>
                        <input
                            required
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            id="titleInput" />
                        <h2>Description:</h2>
                        <textarea
                            required
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            id="titleInput" />
                        <input
                            required
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            placeholder="Enter to add topic"
                            id="topicInput" />
                        <div id="topicsArea">

                        </div>
                    </form>
            )}
            </Formik>
            <Button onClick={()=> goToNextPage()}>Next</Button>
        </Fragment>)
}

export default NeedTutoringPageTwo;