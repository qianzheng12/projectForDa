import {gql} from "apollo-boost";

export const USER_INFORMATION = gql`
    {
        me {
            id
            thumbnail
            firstName
            lastName
        }
    }
`;
export const USER_BOOKMARKED_ANSWERS = gql`
    {
        me {
            bookmarkedAnswers {
                id
                content
                comments {
                    id
                }
                question {
                    id
                    title
                    lastUpdated
                    user {
                        id
                        firstName
                        lastName
                        school
                    }
                    topics {
                        name
                    }
                }
            }
        }
    }
`;