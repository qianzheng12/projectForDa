import React, {useState} from "react";
import './profileSetting.css'

const SettingField = ({field,updateSelf}) => {
    const [editMode, setEditMode] = useState(false);
    const edit = () => {
        switch (field.name) {
            case "School": return;
            case "Major": setEditMode(true);
            case "Year": setEditMode(true);
            case "Secondary Email": setEditMode(true);
            case "Phone number": setEditMode(true);
            case "Password": return;

            default:return;
        }
    };
    const update = () => {
        switch (field.name) {
            case "School": return;
            case "Major": updateSelf();break;
            case "Year": setEditMode(true);break;
            case "Secondary Email": setEditMode(true);
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
                {editMode && <input onChange={(e)=>{field.updateField(e.target.value)}} value={field.mappedField}/>}
            </div>
            <div className="ProfileSettingChange">
                {editMode &&<p onClick={()=>{update()}}>save</p>}
                {editMode &&<p onClick={()=>{setEditMode(false)}}>cancel</p>}
                {!editMode &&<p onClick={edit}>{field.changeField}</p>}
            </div>
        </div>

    )
};
export default SettingField;