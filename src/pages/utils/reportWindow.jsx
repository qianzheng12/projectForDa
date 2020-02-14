import React, {useRef, useState} from "react";
import './reportWindow.css'
import Button from "@material-ui/core/Button";

const ReportWindow = ({user={firstName:"qian",lastName:"Zheng"},closeWindow}) => {
    const [harassmentCheck, setHarassmentCheck] = useState(false);
    const [hateCheck, setHateCheck] = useState(false);
    const [spamCheck, setSpamCheck] = useState(false);
    const [illegalCheck, setIllegalCheck] = useState(false);
    const [otherCheck, setOtherCheck] = useState(false);
    const [additionInformation,setAdditionInformation] = useState('');
    return (
        <div className="reportWindow">



            <div className="reportHeader">
                <h1><b>Report</b> {user.firstName + ' ' +user.lastName}'s Answer</h1>
            </div>
            <div className="reportOptions">
                <div className="reportOption" onClick={()=>setHarassmentCheck(!harassmentCheck)}> <input type="radio"  checked={harassmentCheck} /> <span>Harassment or bullying</span></div>
                <div className="reportOption" onClick={()=>setHateCheck(!hateCheck)}>  <input type="radio"  checked={hateCheck} /> <span>Hate speech/racism</span></div>
                <div className="reportOption" onClick={()=>setSpamCheck(!spamCheck)}>  <input type="radio"  checked={spamCheck} /> <span>Spam or advertisement</span></div>
                <div className="reportOption" onClick={()=>setIllegalCheck(!illegalCheck)}>  <input type="radio" checked={illegalCheck} /> <span>Illegal activities</span></div>
                <div className="reportOption" onClick={()=>setOtherCheck(!otherCheck)}>  <input type="radio"  checked={otherCheck} /> <span>Other</span></div>
            </div>
            <div className="reportInformation">
                <textarea value={additionInformation} placeholder={"Additional Information(Optional)"} onChange={(e)=>{setAdditionInformation(e.target.value)}}/>
            </div>
            <div className="reportActions">
                <Button id="cancel" onClick={closeWindow}><span>Cancel</span></Button>
                <Button id="report"><span>Report</span></Button>
            </div>
        </div>
    )
};
export default ReportWindow;