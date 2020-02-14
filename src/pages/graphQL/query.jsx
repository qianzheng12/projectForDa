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
                    university{
                        id
                        name
                    }
                    firstName
                    lastName
                    thumbnail
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
                university{
                    id
                    name
                }


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
                university{
                    id
                    name
                }
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
                    university{
                        id
                        name
                    }
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
            university{
                id
                name
            }
            major
            year
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
                university{
                    id
                    name
                }
                major
                year
                lastName
            }
            content
            replies{
                user{
                    firstName
                    lastName
                    thumbnail
                    university{
                        id
                        name
                    }
                    major
                    year
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
                university{
                    id
                    name
                }
                major
                year

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

export const GET_UNIVERSITY_BY_DOMAIN = gql`query($domain:String!)
{
    getUniversityByDomain(domain:$domain){
        id
        name
    }
}
`;