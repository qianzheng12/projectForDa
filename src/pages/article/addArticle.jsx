import React from "react";
import './addArticle.css'
import PostPage from "../posts/postPage";

export const AddArticle = () => {
    return (
        <div className="AddArticleWrapper">
            <div className="addArticleFormWrapper">
                <PostPage type="article"/>
            </div>
        </div>
    )
};
