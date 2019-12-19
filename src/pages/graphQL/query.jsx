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
            }
            lastUpdated
            user {
                id
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
                    school

                }
                lastUpdated
                comments{
                    id
                    user {
                        id
                        firstName
                        lastName
                    }
                    content
                    replies{
                        user{
                            firstName
                            lastName
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