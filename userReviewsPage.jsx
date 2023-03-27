import React, { useState, useEffect } from 'react';

const UserReviewsPage = ({targetStoreName, setTargetStoreName, reviewInput, setReviewInput, avgStars, setAvgStars, targetStoreId, reviews, toggleUserReviews, setToggleUserReviews}) => {

    let [matchingReviews, setMatchingReviews] = useState([]);
    //let [avgStars, setAvgStars] = useState(0);

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

    useEffect(() => {
        let tempAvg = 0;

        if (matchingReviews.length > 0) {

            for (let i = 0; i < matchingReviews.length; i++) {

                tempAvg+=matchingReviews[i].stars;
            }

            tempAvg = tempAvg/matchingReviews.length;
        }

        setAvgStars(tempAvg);
        console.log(tempAvg);

    }, [matchingReviews])


    if (toggleUserReviews == false) {
        return (null)
    }
    else if (toggleUserReviews == true) {

        if (matchingReviews.length > 0) {
            return (
            <div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p>
                    <p className="avg-ranking"><b>{avgStars} Stars</b> Average Community Ranking</p>
                    {matchingReviews.map(e => <div className = "review-box"><p>{e.stars} out of 6 Stars</p><p>{e.body}</p></div>)}
                    <p>Found information? Submit a review!</p>
                    <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
                    <button className = "submit-button">Submit Review</button>
                    <div className="footer"></div>
            </div>
            )
        }
        else {
            return (
            <div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p>
                    <p>Found information? Submit a review!</p>
                    <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
                    <button className = "submit-button">Submit Review</button>
                    <div className="footer"></div>
            </div>
            )
        }
    }
}

export default UserReviewsPage;