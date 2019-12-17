import { gql } from 'apollo-boost';


export const POST_QUESTION_ARTICLE = gql`mutation($title:String,$description:String,$isArticle:Boolean){
    createQuestion(userID:"1805b324-61a5-40a3-a150-4b6e67e4895f",
        input:{title:$title,description:$description,isArticle:$isArticle}){
        id,
    }
}`;

export const ANSWER_QUESTION = gql`mutation($questionId:GUID,$answerContent:String){
    createAnswer(input:{userID:"1805b324-61a5-40a3-a150-4b6e67e4895f",
        content:$answerContent,
        questionID:$questionId}){
            id
            content
            user {
                id
                firstName
                lastName
                school
        
            }
            lastUpdated
            comments{
                id
                user {
                    id
                    firstName
                    lastName
                }
                content
                replies{
                    user{
                        firstName
                        lastName
                    }
                    content
                }
            }
        }
}`;

export const SEND_COMMENT = gql`mutation($answerId:GUID,$commentContent:String){
    createComment(input:
    {
        userID:"1805b324-61a5-40a3-a150-4b6e67e4895f",
        content:$commentContent,
        answerID:$answerId})
    {
        id
    }
}`;

export const CREATE_TOPIC = gql`mutation($topicName:String){
    createTopic(input:{name:$topicName}){
        id
        name
    }
}`;
export const ADD_TOPIC_TO_QUESTION = gql`mutation($questionID:GUID!,$topicID:GUID!){
    addTopicToQuestion(questionID:$questionID, topicID:$topicID)
}`;

export const CREATE_REPLY = gql`mutation($commentID:GUID!,$content:String!){
    createReply(
        input:{
            userID:"1805b324-61a5-40a3-a150-4b6e67e4895f",
            content:$content
            commentID:$commentID}){
        id
    }
}`;

export const UPLOAD_IMAGE = gql`mutation($fileName:String!,$type:ImageType!,$base64:String!){
    uploadImage(
            fileName:$fileName,
            type:$type
            base64:$base64)
}`;

