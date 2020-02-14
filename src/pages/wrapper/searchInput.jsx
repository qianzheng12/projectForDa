import React, {useState} from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {Link,Redirect} from "react-router-dom";
const SearchInput = () => {
    const [searchContent, setSearchContent] = useState("");
    const [reDirect,setReDirect] = useState(false);

    const clickSearch = (e)=>{
        if(searchContent.length === 0){
            e.preventDefault();
        }
        setSearchContent('')
    }
    return (
        <div className="inputArea">
            <input value={searchContent} style={{paddingLeft:"10px"}} onChange={(e)=>{setSearchContent(e.target.value)}} placeholder="what is your singularity?"/>
            <Link  onClick={clickSearch} to={`/searchPage/${searchContent}`}><SearchOutlinedIcon /></Link>
        </div>
    )
}

export default SearchInput;