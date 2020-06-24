import React, {useState} from "react";
import './profileSetting.css'
import SettingField from "./settingField";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_SELF} from "../graphQL/userMutation";
import NameSettingField from "./nameSettingField";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TutorCardSettingField from "./TutorCardSettingField";

const ProfileSettingPage = ({user,refetch}) => {
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [major,updateMajor] = useState(user.major);
    const [year,updateYear] = useState(user.year);
    const [secondEmail,updateSecondEmail] = useState(user.secondEmail);
    const [phoneNumber,updatePhoneNumber] = useState(user.phone);
    const [updateSelfMutation,{error:updateError}] = useMutation(UPDATE_SELF);
    const [hideUniversity, setHideUniversity] = useState(user.hideUniversity);
    const updateSelf= ()=>updateSelfMutation({variables:{
            phoneNumber,
            firstName,
            lastName,
            major,
            year,
            secondEmail,
            hideUniversity:!hideUniversity
        },
        onError:(err=>{
            console.log(err)
    })
    }).then(result=>{
            if(result){
                refetch()
            }
    }).catch();

    if(updateError){
        alert(updateError);
    }
    const settingFields = [
        {name:"School Email",mappedField:user.email,changeField:""},
        {name:"School",mappedField:user.university.name,changeField:hideUniversity,updateField:()=>setHideUniversity(!hideUniversity)},
        {name:"Major",mappedField:major,updateField:updateMajor,changeField:"Edit"},
        {name:"Year",mappedField:year,updateField:(majorYear)=>{updateYear(majorYear.value)},changeField:"Change"},
        {name:"Secondary Email",mappedField:secondEmail,updateField:updateSecondEmail,changeField:"Edit"},
        {name:"Phone number",mappedField:phoneNumber,updateField:updatePhoneNumber,changeField:"Edit"},
        {name:"Password",mappedField:"******"}];
    return (
        <div className="profileHomePageWrapper">
            <div className="ProfileContentList">
                <div className="profileSettingOverview">
                    {user.thumbnail?<img src={user.thumbnail}/>:<AccountCircleIcon/>}
                    <div id="introduction">
                        <h1>{`${user.firstName} ${user.lastName}`}</h1>
                        <span>{`${user.major} ${user.year}`}</span>
                    </div>
                </div>
                <NameSettingField firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} updateSelf={updateSelf}/>
                {settingFields.map(field => (
                    <SettingField field={field} key={field.name} updateSelf={updateSelf}/>
                ))}
                <TutorCardSettingField user={user} refetch={refetch}/>
            </div>
        </div>
    )
};
export default ProfileSettingPage;