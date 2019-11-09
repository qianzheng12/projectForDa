import React from 'react'

const SearchInput = () => {
    return (
        <div className="inputArea">
            <input style={{paddingLeft:"10px"}}placeholder="what is your singularity?"/>
            <img height="20px" width="20px" src={require('../../resource/magnifying-glass.svg')}/>
        </div>
    )
}

export default SearchInput;