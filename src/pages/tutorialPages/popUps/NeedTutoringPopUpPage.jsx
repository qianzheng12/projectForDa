import React, {useState} from 'react'
import './NeedTutoringPopUpPage.css'
import Button from "@material-ui/core/Button";
import NeedTutoringPageTwo from "./NeedTutoringPageTwo";
import NeedTutoringPageThree from "./NeedTutoringPageThree";

const NeedTutoringPopUpPage = () => {
    const [pageNumber, setPageNumber] = useState(3);
    return (
        <div className="TutoringPopUpWrapper">
            {pageNumber === 1 &&
                <div className="TutorialPopUpPageOneWrapper">
                    <h1>Great!</h1>
                    <p>We welcome everyone to pass on their knowlege here. It doesn't matter if you are junior or senior, you can become a good tutor as long as you do the following:</p>
                    <ul>
                        <li>Fully master the subject you plan to teach </li>
                        <li>Able to make a tutoring plan</li>
                        <li>Exhibit patience and able to breakdown difficult things in a clear and concise way</li>
                    </ul>
                    <p>If you can do all this, there are only a few more steps and then you can start! Happy tutoring!</p>
                    <Button onClick={()=>{setPageNumber(2)}}>Next</Button>
                </div>
            }
            {
                pageNumber === 2 &&
                <div className="NeedTutorialPageTwoWrapper">
                    <NeedTutoringPageTwo goToNextPage={()=>setPageNumber(3)}/>
                </div>
            }
            {
                pageNumber === 3 &&
                <div className="NeedTutorialPageTwoWrapper">
                    <NeedTutoringPageThree goToNextPage={()=>setPageNumber(3)}/>
                </div>
            }
        </div>
    )
};

export default NeedTutoringPopUpPage;