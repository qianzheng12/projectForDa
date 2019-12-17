import React from "react";
import './profileSetting.css'

const ProfileSettingPage = props => {

    const settingFields = [
        {name:"Name",mappedField:"Allan Yang",changeField:"Edit"},
        {name:"School Email",mappedField:"byang9@illinois.edu",changeField:"Edit"},
        {name:"School",mappedField:"University of Illinois at Urbana-Champaign",changeField:"not your school?"},
        {name:"Major",mappedField:"Mathematics",changeField:"Edit"},
        {name:"Year",mappedField:"Undergraduate Junior",changeField:"Change"},
        {name:"Contact Email",mappedField:"-",changeField:"Edit"},
        {name:"Phone number",mappedField:"630-638-8818",changeField:"Edit"},
        {name:"Password",mappedField:"******",changeField:"Change"}];
    return (
        <div className="profileHomePageWrapper">
            <div className="ProfileContentList">
                {settingFields.map(field => (
                    <div className="ProfileSettingListItem">
                        <div className="ProfileSettingListName">
                            <p>{field.name}:</p>
                        </div>
                        <div className="ProfileSettingListContent">
                            <p>{field.mappedField}</p>
                        </div>
                        <div className="ProfileSettingChange">
                            <p>{field.changeField}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};
export default ProfileSettingPage;