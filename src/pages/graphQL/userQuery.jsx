import {gql} from "apollo-boost";

export const USER_INFORMATION = gql`
    {
        me {
            id
            thumbnail
            firstName
            school
            major
            year
            lastName
            answers{
                id
                content
                lastUpdated
                question{
                    topics{
                        name
                    }
                    title
                }
            }
            questions {
                id
                title
                description
                isArticle
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