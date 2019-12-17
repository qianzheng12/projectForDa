import {gql} from "apollo-boost";

export const ADD_TOPIC_RELATIONSHIP = gql`mutation($parentID:GUID!,$childID:GUID!){
    addTopicRelationship(parentID:$parentID, childID:$childID)
}`;

export const UPDATE_TOPIC = gql`mutation($topicID:GUID!,$topicName :String, $topicDescription :String,$topicThumbnail:String){
    updateTopic(topicID:$topicID,input:{name:$topicName, description:$topicDescription, thumbnail:$topicThumbnail}){
        id
    }
}`;