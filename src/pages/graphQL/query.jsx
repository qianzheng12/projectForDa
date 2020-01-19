import {gql} from 'apollo-boost';

export const GET_FEED_ANSWERS = gql`
    {
        questions  {
            id 
            title
            
            answers(orderBy: RECENT, limit:1){
                id
                content
                comments{
                    id
                }
                user {
                    id
                    firstName
                    lastName
                    thumbnail
                    school

                }
                upvote
                downvote
                upvoteStatus
            }
            lastUpdated
            user {
                id
                thumbnail
                firstName
                lastName
                school

            }
            topics{
                id
                name
            }
            
        }
        me{
            id
            followedTopics{
                id
                name
                thumbnail
            }
        }
    }
`;

export const SEARCH_ANSWER = gql` query($searchString:String,$topicIDs:[GUID])
    {
        search(searchString:$searchString,topicIDs:$topicIDs) {
            id
            title
            answers(orderBy: RECENT, limit:1){
                content
                comments{
                    id
                }
                user {
                    id
                    firstName
                    lastName
                    school
                }
                upvote
                downvote
                upvoteStatus
            }
            topics{
                id
                name
            }
            lastUpdated
            user {
                id
                firstName
                lastName
                school
            }
        }
        
        me{
            id
            followedTopics{
                id
                name
                thumbnail
            }
        }
    }
`;
export const GET_QUESTION = gql` query($id:GUID!,$orderBy:OrderType)
    {
        getQuestion (questionID:$id) {
            title 
            id
            upvote
            downvote
            upvoteStatus
            answers(orderBy: $orderBy) {
                id
                content
                user {
                    id
                    firstName
                    lastName
                    thumbnail
                    school

                }
                upvote
                downvote
                upvoteStatus
                lastUpdated
                comments{
                    id
                    user {
                        id
                        firstName
                        lastName
                        thumbnail
                        school
                    }
                    upvote
                    downvote
                    upvoteStatus
                    content
                    replies{
                        id
                        upvote
                        downvote
                        upvoteStatus
                        user{
                            firstName
                            lastName
                            thumbnail
                            school
                        }
                        replyTo{
                            id
                            user{
                                firstName
                                lastName
                            }
                        }
                        comment{
                            user{
                                firstName
                                lastName   
                            }
                            
                        }
                        
                        dateReplied
                        content
                    }
                    dateCommented
                }
            }
            topics{
                id
                name
            }
            description
            lastUpdated
            user {
                id
                firstName
                lastName
                school
                thumbnail

            }
            comments{
                id
                dateCommented
                upvote
                downvote
                upvoteStatus
                user {
                    id
                    firstName
                    thumbnail
                    school
                    lastName
                }
                content
                replies{
                    user{
                        firstName
                        lastName
                        thumbnail
                        school
                    }
                    replyTo{
                        id
                        user{
                            firstName
                            lastName
                        }
                    }
                    comment{
                        user{
                            firstName
                            lastName
                        }
                    }
                    dateReplied
                    content
                    upvote
                    downvote
                    upvoteStatus
                }
            }
        } 
    } 
`;

export const FEED_QUESTIONS = gql`
    {
        questions {
            id
            title
            description
            lastUpdated
            topics{
                id
                name
            }
            user {
                id
                firstName
                lastName
                school

            }
        }
        me{
            id
            followedTopics{
                id
                name
                thumbnail
            }
        }
    }
`;

export const GET_TOPICS = gql`
    {
        topics{
            id
            name
            thumbnail
        }
    }
`;