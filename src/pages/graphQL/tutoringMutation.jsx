import {gql} from "apollo-boost";

export const POST_TUTORING_POST = gql`mutation(
    $title:String,
    $description:String,
    $topics:[String],
    $fee:String,
    $keyConcepts:String,
    $timeAvailability:String,
    $finishBy:String,
    $preferredSoftware:String,
    $materials:Boolean){
    createTutorPost(
        input:{
            title:$title,
            description:$description,
            topics:$topics,
            fee:$fee,
            keyConcepts:$keyConcepts,
            timeAvailability:$timeAvailability,
            finishBy:$finishBy,
            preferredSoftware:$preferredSoftware,
            materials:$materials
        })
    {
        id
    }
}`;

export const CREATE_TUTORING_CARD = gql`mutation(
    $year:String,
    $major:String,
    $skills:String,
    $timeAvailability:String,
    $preferredSoftware:String,
    $details:String){
    createTutorCard(
        input:{
            year:$year,
            major:$major,
            skills:$skills,
            timeAvailability:$timeAvailability,
            preferredSoftware:$preferredSoftware,
            details:$details
        })
    {
        id
    }
}`;

export const APPLY_TUTORING_POST= gql`mutation(
    $postID:GUID!){
    createTutorApplication(postID:$postID)
}`;
