import {gql} from "apollo-boost";


export const ME = gql`
    {
        me {
            id
            thumbnail
            firstName
            major
            year
            university{
                id
                name
            }
            lastName
            phone
            bookmarkedAnswers{
                id
            }
            followedQuestions{
                id
            }
            bookmarkedAnswers {
                id
                content
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
        major
        year
        university{
            id
            name
        }
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
                major
                university{
                    id
                    name
                }
                year

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
                university{
                    id
                    name
                }
                major
                year

            }
        }
    }
`;
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
                    university{
                        id
                        name
                    }
                    major
                    year
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
                        university{
                            id
                            name
                        }
                        major
                        year
                    }
                    topics {
                        name
                    }
                }
            }
        }
    }
`;

export const GET_PROFILE_QUESTIONS = gql`
    {
        me{
            id
            profileQuestions{
                question
                answer
            }
        }
    }
`;

export const GET_PAST_EDUCATION= gql`
    {
        me{
            id
            pastEducation{
                school
                from
                to
                major
                degree
            }
        }
    }
`;