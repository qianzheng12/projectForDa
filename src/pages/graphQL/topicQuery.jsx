import {gql} from "apollo-boost";

export const SEARCH_TOPIC = gql`query($topicName:String!)
{
    searchTopic(searchString:$topicName){
        id
        name
    }
}
`;

export const SEARCH_TOPIC_BY_NAME = gql`query($topicName:String!)
{
    getTopicByName(name:$topicName){
        id
        name
    }
}
`;

export const GET_QUESTION_BY_TOPIC =  gql`query($topicName:String!){
    questions(topics:[$topicName]) {
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
}`
export const TOPIC_PAGE_QUERY = gql`query($topicID:GUID!)
{
    
    getTopic(topicID:$topicID){
        id
        name
        parent{
            name
            id
        }
        children{
            name
            id
        }
        thumbnail
        description
    }
}
`;