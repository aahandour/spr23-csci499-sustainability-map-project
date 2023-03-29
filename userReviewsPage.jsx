import React, { useState, useEffect } from 'react';
import { getLocationReviews, postLocationReview } from './backendwrappers';

const UserReviewsPage = ({targetStoreName, setTargetStoreName, reviewInput, setReviewInput, avgStars, setAvgStars, targetStoreId, reviews, setReviews, toggleUserReviews, setToggleUserReviews}) => {

    let [matchingReviews, setMatchingReviews] = useState([]);
    let [userStars, setUserStars] = useState(null);
    let [tempString, setTempString] = useState('');
    //let [avgStars, setAvgStars] = useState(0);
    useEffect(() => {
        if(reviews){
            setMatchingReviews(reviews)
        }
    }, [reviews])

    useEffect(() => {
        let tempAvg = 0;

        if (matchingReviews != null && matchingReviews.length > 0) {

            for (let i = 0; i < matchingReviews.length; i++) {

                tempAvg+=matchingReviews[i].rating;
            }

            tempAvg = tempAvg/matchingReviews.length;
        }

        setAvgStars(tempAvg.toPrecision(3));

    }, [matchingReviews])


    function submitUserReview() {
        console.log(reviewInput);
        let review = {place_id: targetStoreId, rating: userStars, review: reviewInput};
        console.log(targetStoreId, userStars, reviewInput)
        postLocationReview(targetStoreId, userStars, reviewInput)
        .then(() => {
            getLocationReviews(targetStoreId)
            .then((res) => {
                setReviews([])
                setReviews(res)
                //setMatchingReviews(res)
            })
            .catch((err) => console.log(err))
        })
        .catch((error) => console.log(error))
    }

    const selectStars = (button) => {
        console.log(button.target.innerHTML);
        setUserStars(button.target.innerHTML);
        setTempString(button.target.innerHTML+" Star(s) Selected")
    }

    if (toggleUserReviews == false) {
        return (null)
    }
    else if (toggleUserReviews == true) {

        if (matchingReviews != null && matchingReviews.length > 0) {
            return (
            <div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p>
                    <p className="avg-ranking"><b>{avgStars} Stars</b> Average Community Ranking</p>
                    {matchingReviews.map(e => <div className = "review-box"><p>{e.rating} out of 6 Stars</p><p>{e.review}</p></div>)}

                    <p>Found information? Submit a review!</p>

                    <p>Stars: <button onClick={ selectStars }>1</button><button onClick={ selectStars }>2</button><button onClick={ selectStars }>3</button><button onClick={ selectStars }>4</button><button onClick={ selectStars }>5</button><button onClick={ selectStars }>6</button></p>
                    <p>{tempString}</p>

                    <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
                    <button className = "submit-button" onClick={ submitUserReview }>Submit Review</button>
                    <div className="footer"></div>
            </div>
            )
        }
        else {
            return (
            <div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p>

                    <p>Found information? Submit a review!</p>

                    <p>Stars: <button onClick={ selectStars }>1</button><button onClick={ selectStars }>2</button><button onClick={ selectStars }>3</button><button onClick={ selectStars }>4</button><button onClick={ selectStars }>5</button><button onClick={ selectStars }>6</button></p>
                    <p>{tempString}</p>

                    <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
                    <button className = "submit-button" onClick={ submitUserReview }>Submit Review</button>
                    <div className="footer"></div>
            </div>
            )
        }
    }
}

export default UserReviewsPage;