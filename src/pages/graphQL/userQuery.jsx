import {gql} from "apollo-boost";


export const ME = gql`
    {
        me {
            id
            thumbnail
            firstName
            school
            major
            year
            lastName
            phone
            bookmarkedAnswers{
                id
            }
            followedQuestions{
                id
            }
            answers{
                id
                content
                lastUpdated
                question{
                    id
                    topics{
                        id
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
            bookmarkedAnswers {
                id
                content
                comments {
                    id
                }
                user {
                    id
                    thumbnail
                    firstName
                    lastName
                    school
                }
                question {
                    id
                    title
                    lastUpdated
                    user {
                        id
                        thumbnail
                        firstName
                        lastName
                        school
                    }
                    topics {
                        id
                        name
                    }
                }
            }
        }
    }
`;


export const USER_INFORMATION = gql` query($userID:String!)
    {
        getUser(userID:$userID) {
            id
            thumbnail
            firstName
            school
            major
            year
            lastName
            followed
            phone
            answers{
                id
                content
                lastUpdated
                question{
                    id
                    topics{
                        id
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
                        id
                        name
                    }
                }
            }
        }
    }
`;
export const USER_FOLLOWED_TOPICS = gql`
    {
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
export const USER_FOLLOWED_USERS = gql`
    {
        me{
            id
            followedUsers{
                id
                firstName
                lastName
                major
                school
                year
                
            }
        }
    }
`
export const USER_BOOKMARKED_ANSWERS = gql`
    {
        me {
            id
            bookmarkedAnswers {
                id
                content
                comments {
                    id
                }
                user {
                    id
                    firstName
                    lastName
                    school
                    thumbnail
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