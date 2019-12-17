import React, {useEffect, useState} from 'react'
import ReactQuill from "react-quill";
import './textInputArea.css'

function uploadImage(quillEditor, props, updateState) {
    updateState();
    const cursorPosition = quillEditor.getSelection().index;
    quillEditor.insertEmbed(cursorPosition, "image","https:/dncg7mmslg3sw.cloudfront.net/profileThumbnail/1805b324-61a5-40a3-a150-4b6e67e4895f 1576009877070");
    quillEditor.setSelection(cursorPosition + 1);
    updateState();

}
class TextInputAreaTEST extends React.Component{
    constructor(props) {
        super(props);
        this.reactQuillRef = null
        this.state = {
            uploadImageWindow: false
        }
    }

    modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline'],
                [{'color': []}, {size: []}],
                [{'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],
                ['image', 'video'],
                ['blockquote', 'code-block'],
            ],  handlers: {
                'image': ()=> this.setState({uploadImageWindow:true})
                /*'image': () => uploadImage(
                    this.reactQuillRef.getEditor(),
                    this.props,
                    ()=>this.setState({uploadImageWindow:true})
                )*/
            }

        }
    }


    render() {
        return (
            <div className="TextInputAreaWrapper">
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    onChange={this.props.setPostContent}
                    placeholder={this.props.placeholder}
                    modules={this.modules}
                    theme={"snow"} // pass false to use minimal theme
                />
            </div>
        );
    }
}


export default TextInputAreaTEST;