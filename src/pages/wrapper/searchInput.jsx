import React, {useState} from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {Link} from "react-router-dom";
const SearchInput = () => {
    const [searchContent, setSearchContent] = useState("");
    return (
        <div className="inputArea">
            <input value={searchContent} style={{paddingLeft:"10px"}} onChange={(e)=>{setSearchContent(e.target.value)}} placeholder="what is your singularity?"/>
            <Link to={`/searchPage/${searchContent}`}><SearchOutlinedIcon /></Link>
        </div>
    )
}

export default SearchInput;