import { gql } from 'apollo-boost';

export const GET_FEED_ANSWERS = gql`
    {
        questions {
            title
            answers{
                content
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

export const GET_QUESTION = gql` query($id:GUID!)
    {
        getQuestion(questionID:$id) {
            title
            id
            answers {
                content
                user {
                    id
                    firstName
                    lastName
                    school

                }
                lastUpdated
                comments{
                    user {
                        id
                        firstName
                        lastName
                    }
                    content
                }
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
