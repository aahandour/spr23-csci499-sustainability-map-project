import axios from 'axios'

//sends GET request to backend api for a particular location
//returns : reviews array for a given location
//notes : if a marker has no associated database entry, the backend will deal with creating an entry with this endpoint call
async function getLocationReviews(place_id) {
    console.log(place_id)
    if(!place_id){
        return
    }
    const response = await axios.get(`http://127.0.0.1:4000/locations/reviews/${place_id}`)
    return await response.data.reviews
}

//sends POST request to backend api
//notes : please include place_id, rating, and text in function call,
//      not including place_id will result in response error
async function postLocationReview(place_id, rating, text){
    if(!place_id){
        return "no place_id"
    }
    const response = axios.post(`http://127.0.0.1:4000/reviews/submit-review`, {
        place_id : place_id,
        rating : rating,
        review : text
    })
    return await response.status == 200
}

export {getLocationReviews, postLocationReview}