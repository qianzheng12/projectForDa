import React, {useState} from 'react'
import './searchPage.css'
import SortMethodButton from "../sortButton/sortMethodButton";
import TopicWrapper from "../topic/topicWrapper";
import {useQuery} from "@apollo/react-hooks";
import {GET_TOPICS, SEARCH_ANSWER} from "../graphQL/query";
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicsFilter from "./topicsFilter";
import {USER_FOLLOWED_TOPICS} from "../graphQL/userQuery";


const SearchPage = props => {
    const searchString = props.match.params.searchString;
    const [searchTopic, setSearchTopic] = useState(null);
    const {loading, error, data} = useQuery(USER_FOLLOWED_TOPICS);
    if (loading) return <div/>;
    if (error) return <div/>;

    const {me:{followedTopics}} =data;
    const filterTopic = (topicIDs) => {
        setSearchTopic(topicIDs)
    };
    return (
        <div className="searchPageWrapper">
            <div className="searchPageContent">
                <div className="searchResultAndFilter">
                    <TopicsFilter filterTopic={filterTopic}/>

                    <SearchResultWrapper topicIDs={searchTopic} searchString={searchString}/>
                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Topics</p>
                    </div>
                    <TopicWrapper topics={followedTopics}/>
                </div>
            </div>
        </div>
    )
};
const SearchResultWrapper = ({searchString, topicIDs}) => {

    const {loading, error, data, refetch} = useQuery(SEARCH_ANSWER, {variables: {searchString, topicIDs}});
    const [selectedSortingMethod, setSelectedSortingMethod] = useState('Auto');
    if (loading) return <div/>;
    if (error) return <div/>;
    const {search: searchResult} = data;
    const filteredOutQuestions = searchResult.filter(question => question.answers.length > 0);
    return (
        <div>
            <div className="questionAnswerGap">
                <p>
                    {filteredOutQuestions.length} relevant results
                </p>
                <SortMethodButton selectedSortingMethod={selectedSortingMethod}
                                  setSelectedSortingMethod={setSelectedSortingMethod}
                                  refetch={(orderType) => refetch({searchString})}/>
            </div>
            <div className="searchResultWrapper">
                {filteredOutQuestions.map(question => {
                    const {answers} = question;
                    if (answers.length > 0) {
                        return (
                            <div className="feedAnswer">
                                <FeedAnswerCard key={question.id} question={question} answer={answers[0]} showAction={true}/>
                            </div>
                        )
                    }
                })}
            </div>
        </div>)
};

export default SearchPage;