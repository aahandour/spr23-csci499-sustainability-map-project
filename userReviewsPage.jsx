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

        if (matchingReviews.length > 0) {
            return (
            <div className = "user-reviews">
                    <p>{matchingReviews[0].name}</p>
                    <input type="text"></input>
                    {matchingReviews.map(e => <div className = "review-box"><p>{e.stars} out of 6 Stars</p><p>{e.body}</p></div>)}
            </div>
            )
        }
        else {
            <div className = "user-reviews">
                    <input type="text"></input>
                    {matchingReviews.map(e => <div className = "review-box"><p>{e.stars} out of 6 Stars</p><p>{e.body}</p></div>)}
            </div>
        }
    }
}

export default UserReviewsPage;