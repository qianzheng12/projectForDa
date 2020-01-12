import React, {useState} from 'react'
import FeedAnswerCard from "../cards/feedAnswerCard";
import {useQuery} from "@apollo/react-hooks";
import {GET_QUESTION_BY_TOPIC} from "../graphQL/topicQuery";
import {SEARCH_ANSWER} from "../graphQL/query";
import SearchOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";


const TopicQuestions = ({topic}) => {
    const {loading,data,refetch} = useQuery(SEARCH_ANSWER,{
        variables:{topicIDs:[topic.id]},fetchPolicy: "network-only"});
    const [searchedValue,setSearchedValue] = useState('');
    if(loading) return <div/>;
    console.log(data);
    const {search:searchResult} = data;
    const filteredOutQuestions = searchResult.filter(question => question.answers.length > 0);

    const searchWithTopic = (searchString) => {
        setSearchedValue(searchString);
        refetch({searchString,topicIDs:[topic.id]})
    };
    return (
        <div>
            <div className="topicContentSearch">
                <SearchOutlinedIcon />
                <input placeholder="search" value={searchedValue} onChange={(e)=>searchWithTopic(e.target.value)}/>
            </div>
        {filteredOutQuestions.map(question => {
                if(question.answers.length >= 1){
                    return (
                        <div className="feedAnswer">
                            <FeedAnswerCard key={question.id} answer={(question.answers)[0]} question={question}/>
                        </div>
                    )
                }
                return null;
            })}
        </div>
    )
};

export default TopicQuestions;