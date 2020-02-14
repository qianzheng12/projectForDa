import {gql} from "apollo-boost";

export const GET_MY_SCHOOL = gql`
    {
        getMySchool{
            id
            name
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
                        university{
                            name
                            id
                        }
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
                

                }
                topics{
                    id
                    name
                }

            }
            numberOfStudents
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