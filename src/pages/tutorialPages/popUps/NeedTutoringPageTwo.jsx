import React, {Fragment, useState} from 'react'
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import SearchTopicDropDown from "../../search/searchTopicDropDown";
import {useTopic} from "../../hooks/searchTopicState";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

const NeedTutoringPageTwo = ({submitForm}) => {
    const {topics, currentTopicValue, setCurrentTopicValue, chooseTopic, addNewTopic, topicEmptyError, showEmptyTopicError} = useTopic();

    return (
        <Fragment>
            <h1>Tutoring Post</h1>
            <Formik

                initialValues={{title: '',description:''}}
                onSubmit={(values) => {
                    if(topics.length === 0){
                        showEmptyTopicError(true);
                    }
                    else{
                        submitForm({...values, topics:topics.map(topic=>(topic.topicId))});
                    }
                }}
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
                            value={values.description}
                            name="description"
                            id="description" />
                        <input
                            value={currentTopicValue}
                            onChange={(e)=>{setCurrentTopicValue(e.target.value)}}
                            id="topicInput" />
                        {topicEmptyError && <p style={{color:'red'}}>Please enter a topic</p>}
                        {currentTopicValue.length>0 &&
                        <div className="topicSearchDropdown" style={{width:"144px"}}>
                            <SearchTopicDropDown chooseTopic={chooseTopic} enteredTopic={currentTopicValue} addNewTopic={addNewTopic} allowCreate={false}/>
                        </div>}
                        <div id="topicsArea">
                            {topics.map(topic => (
                                <div className="enteredTopic">
                                    #{topic.topicName}
                                    <CloseIcon className="enteredTopicClose" style={{width:"13px",height:"13px"}}/>
                                </div>
                            ))}
                        </div>
                        <Button type="submit">Next</Button>
                    </form>
            )}
            </Formik>

        </Fragment>)
};

export default NeedTutoringPageTwo;