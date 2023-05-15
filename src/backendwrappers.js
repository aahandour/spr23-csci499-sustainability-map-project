import axios from 'axios'

async function getUser(user_id, id_token) {
    if (!user_id || !id_token) {
        return
    }
    const config = {
        headers : {'Authorization' : `Bearer ${id_token}`}
    }
    const user = await axios.get(`http://127.0.0.1:3002/user/${user_id}`, config)
    return user.data
}

//sends GET request to backend api for a particular location
//returns : reviews array for a given location
//notes : if a marker has no associated database entry, the backend will deal with creating an entry with this endpoint call
async function getLocationReviews(place_id, place_name) {
    console.log(place_id)
    if(!place_id){
        return
    }
   
    const response = await axios.get(`http://127.0.0.1:3002/locations/reviews/${place_id}`, {
        params: {
            place_name
        }
    })
    return await response.data.reviews
}

//sends POST request to backend api
//notes : please include place_id, rating, and text in function call,
//      not including place_id will result in response error
async function postLocationReview(place_id, rating, text, user_id, auth_token){
    if(!place_id){
        return "no place_id"
    }
    const response = axios.post(`http://127.0.0.1:3002/reviews/submit-review`, {
        place_id : place_id,
        user_id : user_id,
        rating : rating,
        review : text
    }, {
        headers: {'Authorization': `Bearer ${auth_token}`}
    })
    return await response.status === 200
}

async function onLogin(id_token) {
    const config = {
        headers : {'Authorization' : `Bearer ${id_token}`}
    }
    if(!id_token){
        return
    }
    else{
        await axios.post(`http://127.0.0.1:3002/login`, {message : 'New User Logged in'}, config);
    }
}

async function deleteReview(id_token, review_id, place_id) {
    let config = {
        headers : {'Authorization' : `Bearer ${id_token}`}
    }
    if(!id_token || !review_id){
        return
    }
    await axios.delete(`http://127.0.0.1:3002/reviews/delete-review/${review_id}`, config)

}

async function favoriteLocation(user_id, place_id, id_token) {
    const data = {
        place_id: place_id
    }
    const config = {
        headers: {'Authorization' : `Bearer ${id_token}`}
    }
    if (!id_token || !place_id) {
        return
    }
    await axios.post(`http://127.0.0.1:3002/user/add-favorite/${user_id}`)
    return
}

async function getUserFavoriteLocations(user_id, id_token) {
    const config = {
        headers: {'Authorization' : `Bearer ${id_token}`}
    }
    const favorites = await axios.get(`http://127.0.0.1:3002/user/favorites/${user_id}`)
    return favorites.data
}

export {getLocationReviews, postLocationReview, onLogin, deleteReview, favoriteLocation, getUserFavoriteLocations}








// import axios from 'axios'

// //sends GET request to backend api for a particular location
// //returns : reviews array for a given location
// //notes : if a marker has no associated database entry, the backend will deal with creating an entry with this endpoint call
// async function getLocationReviews(place_id) {
//     console.log(place_id)
//     if(!place_id){
//         return
//     }
//     const response = await axios.get(`http://127.0.0.1:3002/locations/reviews/${place_id}`)
//     return await response.data.reviews
// }

// //sends POST request to backend api
// //notes : please include place_id, rating, and text in function call,
// //      not including place_id will result in response error
// async function postLocationReview(place_id, rating, text, user_id, auth_token){
//     if(!place_id){
//         return "no place_id"
//     }
//     const response = axios.post(`http://127.0.0.1:3002/reviews/submit-review`, {
//         place_id : place_id,
//         user_id : user_id,
//         rating : rating,
//         review : text
//     }, {
//         headers: {'Authorization': `Bearer ${auth_token}`}
//     })
//     return await response.status === 200
// }

// async function onLogin(id_token) {
//     let config = {
//         headers : {'Authorization' : `Bearer ${id_token}`}
//     }
//     if(!id_token){
//         return
//     }
//     else{
//         await axios.post(`http://127.0.0.1:3002/login`, {message : 'New User Logged in'}, config);
//     }
// }

// export {getLocationReviews, postLocationReview, onLogin}