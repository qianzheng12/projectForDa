import React, {useState} from 'react'
import './sortMethodButton.css'
const SortMethodButton = () => {
    const [selectedSortingMethod, setSelectedSortingMethod] = useState('Auto');
    const autoButtonColor = selectedSortingMethod === 'Auto' ? '#E4E4E4' : "white";
    let ratingButtonColor = selectedSortingMethod === 'Rating' ? '#E4E4E4' : "white";
    let recentButtonColor = selectedSortingMethod === 'Recent' ? '#E4E4E4' : "white";
    return (
        <div className="sortingSelection">
            <div style={{background:autoButtonColor}}
                 onClick={()=>{setSelectedSortingMethod('Auto')}} className="sortButton">
                Auto
            </div>
            <div style={{background:ratingButtonColor}}
                 onClick={()=>{setSelectedSortingMethod('Rating')}}  className="sortButton">
                Rating
            </div>
            <div style={{background:recentButtonColor}}
                 onClick={()=>{setSelectedSortingMethod('Recent')}}  className="sortButton">
                Recent
            </div>

        </div>
    );
};
export default SortMethodButton;
