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
export const GET_QUESTION = gql` query($id:GUID!)
    {
        getQuestion (questionID:$id) {
            title 
            id
            answers {
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
                        user{
                            firstName
                            lastName
                            thumbnail
                            school
                        }
                        content
                    }
                }
            }
            topics{
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