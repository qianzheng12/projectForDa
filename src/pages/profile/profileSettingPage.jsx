import React, {useState} from "react";
import './profileSetting.css'
import SettingField from "./settingField";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_SELF} from "../graphQL/userMutation";
import NameSettingField from "./nameSettingField";

const ProfileSettingPage = ({user,refetch}) => {
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [major,updateMajor] = useState(user.major);
    const [year,updateYear] = useState(user.year);
    const [phoneNumber,updatePhoneNumber] = useState(user.phone);
    const [updateSelfMutation] = useMutation(UPDATE_SELF);
    const updateSelf = ()=>updateSelfMutation({variables:{
            phoneNumber,
            firstName,
            lastName,
            major,
            year
        }}).then(result=>{
            if(result){
                refetch()
            }
    });
    const settingFields = [
        {name:"School Email",mappedField:user.email,changeField:""},
        {name:"School",mappedField:user.school,changeField:"show/hide"},
        {name:"Major",mappedField:major,updateField:updateMajor,changeField:"Edit"},
        {name:"Year",mappedField:year,updateField:updateYear,changeField:"Change"},
        {name:"Secondary Email",mappedField:"-",changeField:"Edit"},
        {name:"Phone number",mappedField:phoneNumber,updateField:updatePhoneNumber,changeField:"Edit"},
        {name:"Password",mappedField:"******"}];
    return (
        <div className="profileHomePageWrapper">
            <div className="ProfileContentList">
                <NameSettingField firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} updateSelf={updateSelf}/>
                {settingFields.map(field => (
                    <SettingField field={field} updateSelf={updateSelf}/>
                ))}
            </div>
        </div>
    )
};
export default ProfileSettingPage;