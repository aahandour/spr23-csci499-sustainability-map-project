import React, { useState, useEffect } from 'react';

const UserReviewsPage = ({avgStars, setAvgStars, targetStoreId, reviews, toggleUserReviews, setToggleUserReviews}) => {

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
                    <p>{matchingReviews[0].name}</p>
                    <p>{avgStars} Stars Average Community Ranking</p>
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