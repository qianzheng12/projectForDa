import React from 'react'
import './searchPage.css'
import SortMethodButton from "../sortButton/sortMethodButton";
import TopicWrapper from "../homePage/topicWrapper";
import {useQuery} from "@apollo/react-hooks";
import {SEARCH_ANSWER} from "../graphQL/query";
import FeedAnswerCard from "../cards/feedAnswerCard";


const SearchPage = props => {
    const searchString = props.match.params.searchString;
    console.log(searchString)
    const { loading, error, data } = useQuery(SEARCH_ANSWER,{ variables: { searchString }});
    if (loading) return <div/>;
    if (error) return <div/>;
    const searchResult = data.search;
    const filteredOutQuestions = searchResult.filter(question=>question.answers.length>0);
    console.log(searchResult);
    return (
        <div className="searchPageWrapper">
            <div className="searchPageContent">
                <div className="searchResultAndFilter">
                    <div className="filterWrapper">
                        <div className="topicFilterHeader"> <h1>Filter</h1></div>
                        <div className="topicFilters">
                            <div className="topicFilter"> <input type="checkbox"/> <span>Mathemati1cs</span> </div>
                            <div className="topicFilter"> <input type="checkbox"/> <span>Algebra</span> </div>
                            <div className="topicFilter"> <input type="checkbox"/> <span>Geometry</span> </div>
                            <div className="topicFilter"> <input type="checkbox"/> <span>Calculus</span> </div>
                            <div className="topicFilter"> <input type="checkbox"/> <span>Differential equation</span> </div>
                            <div className="topicFilter"> <input type="checkbox"/> <span>Professor</span> </div>
                        </div>

                    </div>
                    <div className="questionAnswerGap">
                        <p>
                            {filteredOutQuestions.length} relevant results
                        </p>
                        <SortMethodButton/>
                    </div>
                    <div className="searchResultWrapper">
                        {filteredOutQuestions.map(question => {
                                return (
                                    <div className="feedAnswer">
                                        <FeedAnswerCard key={question.id} question={question}/>
                                    </div>
                                )
                            })}
                    </div>

                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Topics</p>
                    </div>
                    <TopicWrapper/>
                </div>
            </div>
        </div>
    )
};

export default SearchPage;