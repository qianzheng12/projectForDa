import React, {useEffect, useState} from 'react'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "./topicWrapper";
import './topicPage.css'
import {useMutation, useQuery} from "@apollo/react-hooks";
import TopicCard from "../cards/topicCard";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddAliasesCard from "../cards/addAliasesCard";
import Button from "@material-ui/core/Button";
import {TOPIC_PAGE_QUERY} from "../graphQL/topicQuery";
import {ADD_TOPIC_RELATIONSHIP} from "../graphQL/topicMutation";
import TopicQuestions from "./topicQuestions";
const TopicPage = props => {
    const topicID = props.match.params.topicName;
    const {loading,data,refetch} = useQuery(TOPIC_PAGE_QUERY,{
        variables:{topicID},fetchPolicy: "network-only"});
    const [addTopicRelationshipMutation] = useMutation(ADD_TOPIC_RELATIONSHIP);
    const [editMode,setEditMode] = useState(true);
    if(loading) return <div/>;
    const {getTopic:topic,getTopic:{children,parent,id}} = data;

    const addParent = (parentID) => {
        console.log(children)
        if(children.some(child =>{ return child.id === parentID})){
            alert("You can not add child as parent.");
            return
        }
        if(parentID === id){
            alert("You can not add yourself as parent.");
            return
        }
        addTopicRelationship(parentID,id);
    };

    const addChild = (childID) => {
        if(parent.some(p =>{ return p.id === childID})){
            alert("You can not add parent as child.");
            return
        }
        if(childID === id){
            alert("You can not add yourself as child.");
            return
        }
        addTopicRelationship(id,childID);
    };
    const addTopicRelationship = (parentID, childID) =>{
        addTopicRelationshipMutation({variables: {parentID,childID}}).then((result)=>{
            if(result){
                refetch();
            }
        })
    };
    return (
        <div className="topicPageWrapper">
            <div className="homePageContent" style={{marginLeft: "20vw"}}>
                <div className="topicLeftContent">
                    <div className="topicCard">
                        <TopicCard topic={topic} editMode={editMode} setEditMode={setEditMode}/>
                    </div>
                    <div className="topicContentSearch">
                        <SearchOutlinedIcon />
                        <input placeholder="search"/>
                    </div>
                    {editMode &&
                    <div className="editPart">
                        <div className="topicCard">
                            <AddAliasesCard/>
                        </div>
                            <Button>Submit Changes</Button>
                    </div>}
                    <TopicQuestions topic={topic}/>
                </div>

                <div className="topics">
                    <div className="topicHeader">
                        <p>Parent topics</p>
                    </div>
                    <TopicWrapper editMode={editMode}
                                  chooseTopic={addParent}
                                  topics={parent}/>
                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Child topics</p>
                    </div>
                    <TopicWrapper editMode={editMode}
                                  chooseTopic={addChild}
                                  topics={children}/>
                </div>
            </div>
        </div>
    )
};

export default TopicPage