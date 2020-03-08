import React, {useEffect, useRef, useState} from 'react'
import './searchPage.css'
import TopicWrapper from "../topic/topicWrapper";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {SEARCH_ANSWER, SEARCH_MORE_ANSWER} from "../graphQL/query";
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicsFilter from "./topicsFilter";
import {USER_FOLLOWED_TOPICS} from "../graphQL/userQuery";


const SearchPage = props => {
    const searchString = props.match.params.searchString;
    props.setSelectedPage("");
    const wrapperRef = useRef(null);
    const [searchTopic, setSearchTopic] = useState([]);
    const {loading, error, data} = useQuery(USER_FOLLOWED_TOPICS);
    const [searchResult,setSearchResult] = useState([]);
    const [loadingMoreData, setLoadingMoreData] = useState(false);
    const [noMoreFetching] = useState(false);
    const [searchAnswerQuery,{data:searchData}] = useLazyQuery(SEARCH_ANSWER, {
        onCompleted: () => {
            const { search} = searchData;
            setLoadingMoreData(false);
            setSearchResult(search);
        },
        fetchPolicy:"network-only"});
    const [fetchMoreAnswerQuery,{data:mroeData}] = useLazyQuery(SEARCH_MORE_ANSWER, {
        onCompleted: () => {
            const { search} = mroeData;
            setLoadingMoreData(false);
            setSearchResult([...searchResult,...search]);
        },
        fetchPolicy:"network-only"});
    const [refechQuestionQuery,{data:refetchedData}] = useLazyQuery(SEARCH_ANSWER, {
        onCompleted: () => {
            const { search} = refetchedData;
            setSearchResult(search);
        },
        fetchPolicy:"network-only"});
    useEffect(() => {
        searchAnswerQuery({variables: {searchString, searchTopic,lastOffset: 0,limit:5}})
    },[searchString]);

    if (loading) return <div/>;
    if (error) return <div/>;

    const {me:{followedTopics}} =data;
    const filterTopic = (topicIDs) => {
        setSearchTopic(topicIDs);
        refechQuestionQuery({variables: {searchString, topicIDs:topicIDs,lastOffset: 0,limit:5}})
    };
    const searchMore = () => {
        if(loadingMoreData){
            return;
        }
        setLoadingMoreData(true);
        fetchMoreAnswerQuery({variables: {searchString, searchTopic:searchTopic,lastOffset: searchResult.length,limit:5}})
    };
    const handleScroll = () => {
        if(noMoreFetching){
            return;
        }

        if (wrapperRef.current.scrollHeight - wrapperRef.current.scrollTop - wrapperRef.current.clientHeight !== 0) return;
        searchMore()
    };
    const filteredOutQuestions = searchResult.filter(question => question.answers.length > 0);
    return (
        <div className="searchPageWrapper" ref={wrapperRef} onScroll={handleScroll}>
            <div className="searchPageContent">
                <div className="searchResultAndFilter">
                    <TopicsFilter filterTopic={filterTopic}/>
                    <div className="questionAnswerGap">
                        <p>
                            {filteredOutQuestions.length} relevant results
                        </p>
                    </div>
                    <div className="searchResultWrapper" >
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

export default SearchPage;