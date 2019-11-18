import { gql } from 'apollo-boost';


export const ASK_QUESTION = gql`mutation($title:String,$description:String){
    createQuestion(userID:"1805b324-61a5-40a3-a150-4b6e67e4895f",
        input:{title:$title,description:$description,topic:"sports",tags:"test"}){
        id,
    }
}`;

export const ANSWER_QUESTION = gql`mutation($questionId:GUID,$answerContent:String){
    createAnswer(input:{userID:"1805b324-61a5-40a3-a150-4b6e67e4895f",
        content:$answerContent,
        questionID:$questionId}){
        id
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