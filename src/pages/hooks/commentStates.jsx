import {useState} from "react";

export const useCommentState = ()=>{
    const [commentContent, setCommentContent] = useState('');
    const [commentMode, setCommentMode] = useState(true);
    const [emptyCommentError,setEmptyCommentError] = useState(false);


    return {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError};
};
