import {gql} from "apollo-boost";

export const GET_TUTORING_POSTS = gql`query
{
    tutorPostFeed(lastOffset:0,limit:10){
        id,
        title,
        fee,
        lastUpdated,
        user{
            lastName,
            firstName,
            major,
            year,
        }
        preferredSoftware,
        description,
        topics{
            id,name
        }
    }

    me{
        id
        followedTopics{
            id
            name
            thumbnail
        }
        tutorCard{
            id
        }
    }
}
`;

export const SEARCH_TUTORING_POSTS = gql`query($searchString:String)
{
    searchTutorPost(lastOffset:0,limit:10,searchString:$searchString){
        id,
        title,
        fee,
        lastUpdated,
        user{
            lastName,
            firstName,
            major,
            year,
        }
        preferredSoftware,
        description,
        topics{
            id,name
        }
    }

}
`;