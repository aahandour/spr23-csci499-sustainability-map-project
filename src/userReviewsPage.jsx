import React, { useState, useEffect } from 'react';
import { getLocationReviews, postLocationReview } from './backendwrappers';

const UserReviewsPage = ({targetStoreName, setTargetStoreName, reviewInput, setReviewInput, avgStars, setAvgStars, targetStoreId, reviews, setReviews, toggleUserReviews, setToggleUserReviews, pageNo, setPageNo}) => {

    let [matchingReviews, setMatchingReviews] = useState([]);
    let [userStars, setUserStars] = useState(null);
    let [tempString, setTempString] = useState('');
    //let [avgStars, setAvgStars] = useState(0);

    //////////////PAGES//////////////////
    const maxReviewsPerPage = 2; //low test value
    let [pages, setPages] = useState(Math.ceil(matchingReviews.length/maxReviewsPerPage)); //https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896
    /*need a useeffect, because the pages value will have to update with each added review*/
    useEffect(() => {
        setPages(Math.ceil(matchingReviews.length/maxReviewsPerPage));
    }, [matchingReviews])

    let [currentPageContent, setCurrentPageContent] = useState([]); //fill with only section corresponding to pageNo*maxReviewsPerPage (this is the first value of the page)
    //let [pageNo, setPageNo] = useState(0);

    useEffect(() => {

        console.log("pageNo: "+pageNo);

        //only if matchingReviews !empty
        if (matchingReviews.length != 0) {
            let increment = 0;
            let tempPage = [];
            let START_INDEX = pageNo*maxReviewsPerPage;
            console.log("START_INDEX: "+START_INDEX);

            let CURRENT_INDEX = START_INDEX + increment;
            //console.log("test index: ");
            //console.log(matchingReviews[START_INDEX]);
            while ((increment < maxReviewsPerPage) && (CURRENT_INDEX < matchingReviews.length)) {
                CURRENT_INDEX = START_INDEX + increment;

                console.log(increment+": ");
                console.log(matchingReviews[CURRENT_INDEX]);

                if (matchingReviews[CURRENT_INDEX] != undefined) {
                    tempPage.push(matchingReviews[CURRENT_INDEX]);
                }
                else {
                    console.log("reached undefined value");
                }

                increment++;
            }
            setCurrentPageContent(tempPage);
        }
        else {
            console.log("ERROR - matchingReviews is empty");
        }

    }, [pageNo, matchingReviews])

    function nextPage() {
        if (pageNo < pages-1) {
            setPageNo(pageNo+1);
        }
        else {
            console.log("Reached end of pages");
        }
    }

    function prevPage() {
        if (pageNo > 0) {
            setPageNo(pageNo-1);
        }
        else {
            console.log("Can't go back further");
        }
    }

    function resetPage() {
        setPageNo(0);
        console.log(pageNo);
    }

    useEffect(() => {

        console.log(currentPageContent);

    }, [currentPageContent])
    /////////////////////////////////////



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

        /*add simple Profanities filter*/
        /*add Verified vs unverified status variable in review objects*/

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
            /*<div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p>
                    <p className="avg-ranking"><b>{avgStars} Stars</b> Average Community Ranking</p>
                    {matchingReviews.map(e => <div className = "review-box"><p>{e.rating} out of 5 Stars</p><p>{e.review}</p></div>)}

                    <button className = "page-button" onClick={ nextPage }>increment pageNo</button>
                    <button className = "page-button" onClick={ resetPage }>reset pageNo</button>

                    <p>Found information? Submit a review!</p>

                    <p>Stars: <button onClick={ selectStars }>1</button><button onClick={ selectStars }>2</button><button onClick={ selectStars }>3</button><button onClick={ selectStars }>4</button><button onClick={ selectStars }>5</button></p>
                    <p>{tempString}</p>

                    <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
                    <button className = "submit-button" onClick={ submitUserReview }>Submit Review</button>
                    <div className="footer"></div>
            </div>*///
            <div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p>
                    <p className="avg-ranking"><b>{avgStars} Stars</b> Average Community Ranking</p>
                    {currentPageContent.map(e => <div className = "review-box"><p>{e.rating} out of 5 Stars</p><p>{e.review}</p></div>)}

                    <button className = "page-button" onClick={ nextPage }>increment pageNo</button>
                    <button className = "page-button" onClick={ prevPage }>decrement pageNo</button>
                    <button className = "page-button" onClick={ resetPage }>reset pageNo</button>

                    <p>Found information? Submit a review!</p>

                    <p>Stars: <button onClick={ selectStars }>1</button><button onClick={ selectStars }>2</button><button onClick={ selectStars }>3</button><button onClick={ selectStars }>4</button><button onClick={ selectStars }>5</button></p>
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