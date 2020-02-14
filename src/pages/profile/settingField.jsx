import React, {useState} from "react";
import './profileSetting.css'
import {Link} from "react-router-dom";
import Dropdown from "react-dropdown";
import {degreeYearRange} from "../utility/dateFixture";

const SettingField = ({field,updateSelf}) => {
    const [editMode, setEditMode] = useState(false);
    const [isEditingSchoolYear, setIsEditingSchoolYear] = useState(false);
    const edit = () => {
        switch (field.name) {
            case "School": return;
            case "Major": setEditMode(true);break;
            case "Year": setEditMode(true); setIsEditingSchoolYear(true);break;
            case "Secondary Email": setEditMode(true);break;
            case "Phone number": setEditMode(true);break;
            case "Password": return;

            default:return;
        }
    };
    const update = () => {
        switch (field.name) {
            case "School": return;
            case "Major": updateSelf();break;
            case "Year": setEditMode(true);updateSelf();break;
            case "Secondary Email": setEditMode(true);break;
            case "Phone number": updateSelf();break;
            case "Password": return;

            default:setEditMode(false);
        }
        setEditMode(false);
    };
    return (

        <div className="ProfileSettingListItem">
            <div className="ProfileSettingListName">
                <p>{field.name}:</p>
            </div>
            <div className="ProfileSettingListContent">
                {!editMode&&<p>{field.mappedField}</p>}
                {(editMode && !isEditingSchoolYear ) && <input onChange={(e)=>{field.updateField(e.target.value)}} value={field.mappedField}/>}
                {(editMode && isEditingSchoolYear ) && <Dropdown required options={degreeYearRange} onChange={(data)=>{field.updateField(data)}} value={field.mappedField}
                                                                 className="majorYearPicker" placeholder={degreeYearRange[0]}/>}
            </div>
            <div className="ProfileSettingChange">
                {editMode &&<p onClick={()=>{update()}}>save</p>}
                {editMode &&<p onClick={()=>{setEditMode(false)}}>cancel</p>}
                {!editMode &&<p onClick={edit}>{field.changeField}</p>}
                {field.name==="Password" && <Link to={'/ChangePassword'}><p>Change</p></Link>}
            </div>
        </div>

    )
};
export default SettingField;