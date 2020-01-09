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
    }
`;

export const SEARCH_ANSWER = gql` query($searchString:String!)
    {
        search(searchString:$searchString) {
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

        topics{
            id
            name
            thumbnail
        }
    }
`;
export const GET_QUESTION = gql` query($id:GUID!,$orderBy:OrderType)
    {
        getQuestion (questionID:$id) {
            title 
            id
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
                    content
                    replies{
                        id
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