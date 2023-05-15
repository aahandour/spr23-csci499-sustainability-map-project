import React, { useState, useEffect } from 'react';
import { getLocationReviews, postLocationReview, deleteReview, favoriteLocation } from './backendwrappers';
import { useAuth0 } from "@auth0/auth0-react"

//import PageNavigation from "./pageNavigation";


const UserReviewsPage = ({targetStoreName, setTargetStoreName, reviewInput, setReviewInput, avgStars, setAvgStars, targetStoreId, reviews, setReviews, toggleUserReviews, setToggleUserReviews}) => {

    let [matchingReviews, setMatchingReviews] = useState([]);
    let [userStars, setUserStars] = useState(null);
    let [tempString, setTempString] = useState('');
    //let [avgStars, setAvgStars] = useState(0);

    const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()

    //////////////PAGES//////////////////
    const maxReviewsPerPage = 2; //low test value
    let [pages, setPages] = useState(Math.ceil(matchingReviews.length/maxReviewsPerPage)); //https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896

    /*need a useeffect, because the pages value will have to update with each added review*/
    useEffect(() => {
        setPages(Math.ceil(matchingReviews.length/maxReviewsPerPage));
    }, [matchingReviews])

    /* fill with only section corresponding to pageNo*maxReviewsPerPage (this is the first value of the page) */
    let [currentPageContent, setCurrentPageContent] = useState([]);
    let [pageNo, setPageNo] = useState(0);

    //let [atEndOfPages, setAtEndOfPages] = useState(false);
    //let [atFrontOfPages, setAtFrontOfPages] = useState(false);

    /* Resets pageNo to first page upon switching targeted store, else something like being on page 3 of a store with only 1 page of reviews can occur */
    useEffect(() => {
        setPageNo(0);
    }, [targetStoreName]);

    useEffect(() => {

        console.log("pageNo: "+pageNo);

        /* only if matchingReviews !empty */
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
            console.log("matchingReviews is empty");
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

    function firstPage() {
        setPageNo(0);
        console.log(pageNo);
    }

    function lastPage() {
        setPageNo(pages-1);
        console.log(pageNo);
    }

    useEffect(() => {

        console.log(currentPageContent);

    }, [currentPageContent])


    /* Still has bug where adding a new review does not reflect instantly... */

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

    async function submitUserReview() {

        /* add verified status variable in review objects */
        
        if(!isAuthenticated){
            loginWithRedirect();
        }

        const id = await getIdTokenClaims()


        console.log(reviewInput);
        let review = {place_id: targetStoreId, rating: userStars, review: reviewInput};
        console.log(targetStoreId, userStars, reviewInput)
        postLocationReview(targetStoreId, userStars, reviewInput, user.sub, id.__raw)
        .then(() => {
            console.log("review posted")
            setTimeout(() => {
                getLocationReviews(targetStoreId, targetStoreName).then((res) => {
                    setReviews([])
                    setReviews(res)
                }).catch(err => console.log(err))
            }, 1000);
        })
        .catch((error) => console.log(error))
    }

    async function deleteUserReview(review_id, place_id){
        //TODO: DELETE FUNCTION CURRENTLY WORKS FOR ALL REVIEWS,
        //DELETE FUNCTION SHOULD ONLY WORK ON REVIEWS BELONGING TO CURRENT USER
        deleteReview(getIdTokenClaims(), review_id, place_id)
        .then(() => {
            console.log('review deleted')
            setTimeout(() => {
                getLocationReviews(targetStoreId, targetStoreName).then((res) => {
                    setReviews([])
                    setReviews(res)
                }).catch(err => console.log(err))
            }, 1000);
        })
        .catch((error) => console.log(error))
    }

    function DelButton(props) {
        console.log('helloooooo')
        if(isAuthenticated && user.sub === props.review.author_id.sub) {
            return(
                <div>
                    <button onClick={() => deleteUserReview(props.review._id, props.review.place_id)}>
                        Delete
                    </button>
                </div>
            )
        }
    }

    async function addFavoriteStore(place_id) {
        const id = await getIdTokenClaims()
        favoriteLocation(user.sub, place_id, id.__raw)
        .then(() => {
            console.log('success')
        })
        .catch((error) => console.log(error))
    }

    function FavoriteButton(props) {
        console.log('addstore')
        if(isAuthenticated) {
            return(
                <div>
                    <button onClick={() => addFavoriteStore(props.place_id)}>
                        Favorite
                    </button>
                </div>
            )
        }
    }


    //////////////STARS//////////////////
    const selectStars = (button) => {

        const starButtons = document.getElementsByClassName("star-button");

        for (let i = 0; i < starButtons.length; i++) {

            starButtons[i].style.backgroundColor = "#0073df";
            starButtons[i].style.color = "#ffffff";
        }

        /*Highlights only selected button*/
        /* (Assumes [1 2 3 4 5] format) */
        for (let i = 0; i < starButtons.length; i++) {

            if (starButtons[i].textContent == button.target.innerHTML) {
                starButtons[i].style.backgroundColor = "#b8dcff";
                starButtons[i].style.color = "#0073df";
            }
        }

        /*Highlights everything up to selected button*/
        /* (Assumes [★ ★ ★ ★ ★] format) */
        /*for (let i = 0; i < button.id; i++) {
            //need to create id feature for each, 1, 2, 3, 4 ,5... can't use .target.innerHTML
            //checking id returns undefined...
            starButtons[i].style.backgroundColor = "#b8dcff";
            starButtons[i].style.color = "#0073df";
        }*/

        console.log(button.target.innerHTML);
        setUserStars(button.target.innerHTML);
        setTempString(button.target.innerHTML+" Star(s) Selected");

        /*console.log(button.id);
        setUserStars(button.id);
        setTempString(button.id+" Star(s) Selected");*/
    }
    /////////////////////////////////////

    
    if (toggleUserReviews == false) {
        return (null)
    }
    else if (toggleUserReviews == true) {

        if (matchingReviews != null && matchingReviews.length > 0) { /* If there are reviews associated with current selected place */

            return (
            <div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p><FavoriteButton place_id={targetStoreId}></FavoriteButton>
                    <p className="avg-ranking"><b>{avgStars} Stars</b> Average Community Ranking</p>
                    {currentPageContent.map(e => <div className = "review-box"><p>{e.rating} out of 5 Stars</p><p>{e.review}</p><DelButton review={e}></DelButton></div>)}
                    
                    <p>Page {pageNo+1} of {pages}</p>

                    {/* Might be good to make prev and jump-to-first buttons disappear if you're at the first page already, etc.. using components */}
                    <div className = "page-navigation">
                        <button className = "page-button" onClick={ firstPage } title="Jump to first page">{'<<'}</button>
                        <button className = "page-button" onClick={ prevPage } title="Previous">{'<'}</button>
                        <button className = "page-button" onClick={ nextPage } title="Next">{'>'}</button>
                        <button className = "page-button" onClick={ lastPage } title="Jump to last page">{'>>'}</button>
                    </div>

                    <p>Found information? Submit a review!</p>

                    <p>Stars: <button class="star-button" onClick={ selectStars }>1</button><button class="star-button" onClick={ selectStars }>2</button><button class="star-button" onClick={ selectStars }>3</button><button class="star-button" onClick={ selectStars }>4</button><button class="star-button" onClick={ selectStars }>5</button></p>
                    {/*<p>Stars: <button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button></p>*/}
                    <p>{tempString}</p>

                    <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
                    <button className = "submit-button" onClick={ submitUserReview }>Submit Review</button>
                    <div className="footer"></div>
            </div>
            )
        }
        else { /* If there are no reviews */
            return (
            <div className = "user-reviews">
                    <p className="store-name">{targetStoreName}</p><FavoriteButton place_id={targetStoreId}></FavoriteButton>

                    <p>Found information? Submit a review!</p>

                    <p>Stars: <button class="star-button" onClick={ selectStars }>1</button><button class="star-button" onClick={ selectStars }>2</button><button class="star-button" onClick={ selectStars }>3</button><button class="star-button" onClick={ selectStars }>4</button><button class="star-button" onClick={ selectStars }>5</button></p>
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







// import React, { useState, useEffect } from 'react';
// import { getLocationReviews, postLocationReview } from './backendwrappers';
// import { useAuth0 } from "@auth0/auth0-react"

// //import PageNavigation from "./pageNavigation";

// const UserReviewsPage = ({targetStoreName, setTargetStoreName, reviewInput, setReviewInput, avgStars, setAvgStars, targetStoreId, reviews, setReviews, toggleUserReviews, setToggleUserReviews}) => {

//     let [matchingReviews, setMatchingReviews] = useState([]);
//     let [userStars, setUserStars] = useState(null);
//     let [tempString, setTempString] = useState('');
//     //let [avgStars, setAvgStars] = useState(0);

//     //let [isVerified, setVerifiedStatus] = useState('Unverified');

//     const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()

//     //////////////PAGES//////////////////
//     const maxReviewsPerPage = 2; //low test value
//     let [pages, setPages] = useState(Math.ceil(matchingReviews.length/maxReviewsPerPage)); //https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896

//     /*need a useeffect, because the pages value will have to update with each added review*/
//     useEffect(() => {
//         setPages(Math.ceil(matchingReviews.length/maxReviewsPerPage));
//     }, [matchingReviews])

//     /* fill with only section corresponding to pageNo*maxReviewsPerPage (this is the first value of the page) */
//     let [currentPageContent, setCurrentPageContent] = useState([]);
//     let [pageNo, setPageNo] = useState(0);

//     //let [atEndOfPages, setAtEndOfPages] = useState(false);
//     //let [atFrontOfPages, setAtFrontOfPages] = useState(false);

//     /* Resets pageNo to first page upon switching targeted store, else something like being on page 3 of a store with only 1 page of reviews can occur */
//     useEffect(() => {
//         setPageNo(0);
//     }, [targetStoreName]);

//     useEffect(() => {

//         console.log("pageNo: "+pageNo);

//         /* only if matchingReviews !empty */
//         if (matchingReviews.length != 0) {
//             let increment = 0;
//             let tempPage = [];
//             let START_INDEX = pageNo*maxReviewsPerPage;
//             console.log("START_INDEX: "+START_INDEX);

//             let CURRENT_INDEX = START_INDEX + increment;
//             //console.log("test index: ");
//             //console.log(matchingReviews[START_INDEX]);
//             while ((increment < maxReviewsPerPage) && (CURRENT_INDEX < matchingReviews.length)) {
//                 CURRENT_INDEX = START_INDEX + increment;

//                 console.log(increment+": ");
//                 console.log(matchingReviews[CURRENT_INDEX]);

//                 if (matchingReviews[CURRENT_INDEX] != undefined) {
//                     tempPage.push(matchingReviews[CURRENT_INDEX]);
//                 }
//                 else {
//                     console.log("reached undefined value");
//                 }

//                 increment++;
//             }
//             setCurrentPageContent(tempPage);
//         }
//         else {
//             console.log("matchingReviews is empty");
//         }

//     }, [pageNo, matchingReviews])

//     function nextPage() {
//         if (pageNo < pages-1) {
//             setPageNo(pageNo+1);
//         }
//         else {
//             console.log("Reached end of pages");
//         }
//     }

//     function prevPage() {
//         if (pageNo > 0) {
//             setPageNo(pageNo-1);
//         }
//         else {
//             console.log("Can't go back further");
//         }
//     }

//     function firstPage() {
//         setPageNo(0);
//         console.log(pageNo);
//     }

//     function lastPage() {
//         setPageNo(pages-1);
//         console.log(pageNo);
//     }

//     useEffect(() => {

//         console.log(currentPageContent);

//     }, [currentPageContent])

//     /////////////////////////////////////


//     useEffect(() => {
//         if(reviews){
//             setMatchingReviews(reviews)
//         }
//     }, [reviews])

//     useEffect(() => {
//         let tempAvg = 0;

//         if (matchingReviews != null && matchingReviews.length > 0) {

//             for (let i = 0; i < matchingReviews.length; i++) {

//                 tempAvg+=matchingReviews[i].rating;
//             }

//             tempAvg = tempAvg/matchingReviews.length;
//         }

//         setAvgStars(tempAvg.toPrecision(3));

//     }, [matchingReviews])


//     async function submitUserReview() {

//         /* add simple Profanities filter? */
//         /* add verified status variable in review objects */
//         if(!isAuthenticated){
//             loginWithRedirect();
//         }

//         const id = await getIdTokenClaims()


//         console.log(reviewInput);
//         let review = {place_id: targetStoreId, rating: userStars, review: reviewInput};
//         console.log(targetStoreId, userStars, reviewInput)
//         postLocationReview(targetStoreId, userStars, reviewInput, user.sub, id.__raw)
//         .then(() => {
//             console.log("review posted")
//             setTimeout(() => {
//                 getLocationReviews(targetStoreId).then((res) => {
//                     setReviews([])
//                     setReviews(res)
//                 }).catch(err => console.log(err))
//             }, 200);
//         })
//         .catch((error) => console.log(error))
//     }


//     //////////////STARS//////////////////
//     const selectStars = (button) => {

//         const starButtons = document.getElementsByClassName("star-button");

//         for (let i = 0; i < starButtons.length; i++) {

//             starButtons[i].style.backgroundColor = "#0073df";
//             starButtons[i].style.color = "#ffffff";
//         }

//         /*Highlights only selected button*/
//         /* (Assumes [1 2 3 4 5] format) */
//         for (let i = 0; i < starButtons.length; i++) {

//             if (starButtons[i].textContent == button.target.innerHTML) {
//                 starButtons[i].style.backgroundColor = "#b8dcff";
//                 starButtons[i].style.color = "#0073df";
//             }
//         }

//         /*Highlights everything up to selected button*/
//         /* (Assumes [★ ★ ★ ★ ★] format) */
//         /*for (let i = 0; i < button.id; i++) {
//             //need to create id feature for each, 1, 2, 3, 4 ,5... can't use .target.innerHTML
//             //checking id returns undefined...
//             starButtons[i].style.backgroundColor = "#b8dcff";
//             starButtons[i].style.color = "#0073df";
//         }*/

//         console.log(button.target.innerHTML);
//         setUserStars(button.target.innerHTML);
//         setTempString(button.target.innerHTML+" Star(s) Selected");

//         /*console.log(button.id);
//         setUserStars(button.id);
//         setTempString(button.id+" Star(s) Selected");*/
//     }
//     /////////////////////////////////////

    
//     if (toggleUserReviews == false) {
//         return (null)
//     }
//     else if (toggleUserReviews == true) {

//         if (matchingReviews != null && matchingReviews.length > 0) { /*REVIEWS EXIST*/

//             return (
//             <div className = "user-reviews">
//                     <p className="store-name">{targetStoreName}</p>
//                     <p className="avg-ranking"><b>{avgStars} Stars</b> Average Community Ranking</p>
//                     {currentPageContent.map(e => <div className = "review-box"><p>{e.rating} out of 5 Stars</p><p>{e.review}</p></div>)}
                    
//                     <p className ="pageno-string">Page {pageNo+1} of {pages}</p>

//                     {/* Might be good to make prev and jump-to-first buttons disappear if you're at the first page already, etc.. using components */}
//                     <div className = "page-navigation">
//                         <button className = "page-button" onClick={ firstPage } title="Jump to first page">{'<<'}</button>
//                         <button className = "page-button" onClick={ prevPage } title="Previous">{'<'}</button>
//                         <button className = "page-button" onClick={ nextPage } title="Next">{'>'}</button>
//                         <button className = "page-button" onClick={ lastPage } title="Jump to last page">{'>>'}</button>
//                     </div>

//                     <p>Found information? Submit a review!</p>

//                     <p class="stars">Stars: <button class="star-button" onClick={ selectStars }>1</button><button class="star-button" onClick={ selectStars }>2</button><button class="star-button" onClick={ selectStars }>3</button><button class="star-button" onClick={ selectStars }>4</button><button class="star-button" onClick={ selectStars }>5</button></p>
//                     {/*<p>Stars: <button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button><button class="star-button" onClick={ selectStars }>★</button></p>*/}
//                     <p className="star-string">{tempString}</p>

//                     <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
//                     <button className = "submit-button" onClick={ submitUserReview }>Submit Review</button>
//                     <div className="footer"></div>
//             </div>
//             )
//         }
//         else { /*NO REVIEWS*/
//             return (
//             <div className = "user-reviews">
//                     <p className="store-name">{targetStoreName}</p>

//                     <p>Found information? Submit a review!</p>

//                     <p>Stars: <button class="star-button" onClick={ selectStars }>1</button><button class="star-button" onClick={ selectStars }>2</button><button class="star-button" onClick={ selectStars }>3</button><button class="star-button" onClick={ selectStars }>4</button><button class="star-button" onClick={ selectStars }>5</button></p>
//                     <p className="star-string">{tempString}</p>

//                     <textarea className="review-input" value={ reviewInput } onChange={ e => setReviewInput(e.target.value) }></textarea>
//                     <button className = "submit-button" onClick={ submitUserReview }>Submit Review</button>
//                     <div className="footer"></div>
//             </div>
//             )
//         }
//     }
// }

// export default UserReviewsPage;