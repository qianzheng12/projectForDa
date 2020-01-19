import { gql } from 'apollo-boost';


export const POST_QUESTION_ARTICLE = gql`mutation($title:String,$description:String,$isArticle:Boolean){
    createQuestion(
        input:{title:$title,description:$description,isArticle:$isArticle}){
        id,
    }
}`;

export const ANSWER_QUESTION = gql`mutation($questionId:GUID,$answerContent:String){
    createAnswer(input:{content:$answerContent,
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

export const CREATE_REPLY = gql`mutation($commentID:GUID!,$content:String!,$replyTo:GUID){
    createReply(
        input:{
            content:$content
            replyTo:$replyTo
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


export const COMMENT_ARTICLE = gql`mutation($questionID:GUID,$commentContent:String){
    createComment(input:
    {
        content:$commentContent,
        questionID:$questionID
    })
    {
        id
    }
}`;

export const FOLLOW_QUESTION = gql`mutation($questionID:GUID){
    followQuestion(questionID:$questionID)
}`;

export const UP_VOTE = gql`mutation($id:GUID!){
    upvote(id:$id)
}`;

export const UN_UP_VOTE = gql`mutation($id:GUID!){
    unUpvote(id:$id)
}`;

export const DOWN_VOTE = gql`mutation($id:GUID!){
    downvote(id:$id)
}`;

export const UN_DOWN_VOTE = gql`mutation($id:GUID!){
    unDownvote(id:$id)
}`;
