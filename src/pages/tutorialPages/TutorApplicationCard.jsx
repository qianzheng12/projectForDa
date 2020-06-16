import React, {Fragment, useState} from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";

const TutorApplicationCard = ({application}) => {
    const [showDetail, setShowDetail] = useState(false);
    const {tutorCard} = application;
    return (
        <Fragment>
            <div className="tutorApplicationCardHeader">
                <div className="tutorialPostUser" style={{width: "100%"}}>
                    <img src={require('../../resource/ted.jpg')}/>
                    <div className="tutorialPostUserDetail" style={{width: "85%"}}>
                        <span style={{float: "left"}}>{`${application.firstName} ${application.lastName}`}</span>
                        <p>2 hours</p>
                        <h2>{`${application.university.name} ${application.major} ${application.year}`}</h2>
                    </div>
                    <ArrowDropDownIcon onClick={()=>setShowDetail(!showDetail)}/>
                </div>
            </div>
            {
                showDetail &&
                <div className="tutoringApplicationBottomPart">
                    <div className="tutoringDetailItem">
                        <h3>Rating:</h3>
                        <Rating name="disabled" value={3} disabled />

                    </div>
                    <div className="tutoringDetailItem">
                        <h3>What year are you in?</h3>
                        <p>{tutorCard.year}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>What's your major/research direction?</h3>
                        <p>{tutorCard.major}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Skills and abilities:</h3>
                        <p>{tutorCard.skills}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Time availability:</h3>
                        <p>{tutorCard.timeAvailability}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>What software do you prefer to use?</h3>
                        <p>{tutorCard.preferredSoftware}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>More details:</h3>
                        <p>{tutorCard.details}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Estimated time needed:</h3>
                        <p>6}</p>
                    </div>
                    <div className="tutoringApplicationCardFooter">
                        <Button id="message">Message</Button>
                        <Button id="deal">Deal!</Button>
                    </div>
                </div>
            }

        </Fragment>
    )
};

export default TutorApplicationCard;
