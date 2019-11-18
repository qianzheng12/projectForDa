import React from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
const SearchInput = () => {
    return (
        <div className="inputArea">
            <input style={{paddingLeft:"10px"}}placeholder="what is your singularity?"/>
            <SearchOutlinedIcon/>
        </div>
    )
}

export default SearchInput;