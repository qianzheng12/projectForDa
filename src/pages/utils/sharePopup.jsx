import React, {useRef, useState} from "react";
import './sharePopup.css'
import {FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon} from 'react-share'
import {borderBottom} from "@material-ui/system";
import {CopyToClipboard} from "react-copy-to-clipboard";
const SharePopup = ({url="www.singularity.com"}) => {
    return (
        <div className="sharePopupWrapper">
            <div className="topPart">
                <span> Share to: </span>
            </div>
            <div style={{borderBottom:"1px solid #BCBCBC" ,width:"90%",position:"relative",left:"10px"}}/>
            <div className="bottomPart">
                <div className="shareUrlArea"><p>{url}</p></div>
                <CopyToClipboard  text={url}><span>copy</span></CopyToClipboard>
            </div>
        </div>
    )
};
export default SharePopup;