import {gql} from "apollo-boost";

export const FOLLOW_QUESTION = gql`mutation($questionID:GUID!){
    followQuestion(questionID:$questionID)
}`;

export const BOOKMARK_ANSWER = gql`mutation($answerID:GUID!){
    bookmarkAnswer(answerID:$answerID)
}`;

export const UN_BOOKMARK_ANSWER = gql`mutation($answerID:GUID!){
    unBookmarkAnswer(answerID:$answerID)
}`;

export const UPDATE_THUMBNAIL = gql`mutation($thumbnail:String){
    updateSelf(input:{thumbnail:$thumbnail}){
        id
    }
}`;
