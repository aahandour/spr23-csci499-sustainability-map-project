import React, { useState, useEffect } from 'react';

const UserReviewsPage = ({targetStoreId, reviews, toggleUserReviews, setToggleUserReviews}) => {

    let [matchingReviews, setMatchingReviews] = useState([]);

    useEffect(() => { //when clicked on store id changes, change displayed reviews
        let tempArray = [];
        
        for (let i = 0; i < reviews.length; i++) {
            if (targetStoreId == reviews[i].place_id) {
                tempArray.push(reviews[i]);
            }
        }
        setMatchingReviews(tempArray);
        console.log(tempArray);

    }, [targetStoreId])


    if (toggleUserReviews == false) {
        return (null)
    }
    else if (toggleUserReviews == true) {
        return (
           <div className = "user-reviews">
                {<input type="text"></input>}
                {matchingReviews.map(e => <div><p>{e.name}</p><p>{e.stars} out of 6 Stars</p></div>)}
           </div>
        )
    }
}

export default UserReviewsPage;