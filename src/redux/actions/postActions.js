import * as actionTypes from '../constants/actionTypes'
import axios from '../../utils/axios';
import GetHeaders from '../../utils/headers';

export const addPostsData = (posts ,hasMore) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.ADD_POSTS_DATA, posts, hasMore})
    }
}

// export const addPostsData = () => {
//     return (dispatch, getState) => {
//         axios.get('api/v1/post/getAllPosts/1', {headers: GetHeaders()}).then(res => {
//             if(res.data.length<5){
//                 dispatch({type: actionTypes.ADD_POSTS_DATA, posts:res.data, hasMore: false})
//             }else{
//                 dispatch({type: actionTypes.ADD_POSTS_DATA, posts: res.data, hasMore: true})
//             }
//         })
//     }
// }

export const dispatchMorePosts = (nextPage, postsData) => {
    console.log('reached here')
    return (dispatch, getState) => {
        axios.get(`api/v1/post/getAllPosts/${nextPage}`, {headers: GetHeaders()}).then(res => {
            const newPostsData = postsData.concat(res.data)
            if(res.data.length<5){
                dispatch({type: actionTypes.ADD_POSTS_DATA, posts: newPostsData, hasMore: false})
            }else{
                dispatch({type: actionTypes.ADD_POSTS_DATA, posts: newPostsData, hasMore: true})
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export const removePostsData = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.REMOVE_POSTS_DATA})
    }
} 

export const addLikeToPost = (post, userData) => {
    return (dispatch, getState) => {
        axios.post('api/v1/like/add', {postId: post._id} ,{headers: GetHeaders()}).then(res => {
            dispatch({type: actionTypes.ADD_REMOVE_LIKE_FROM_POST, data: {postId: post._id, likedBy: userData.id, state: 'add'}})
        }).catch(err => {
            console.log(err);
        })
    }
}

export const removeLikeFromPost = (post, userData) => {
    return (dispatch, getState) => {
        axios.post('api/v1/like/remove', {postId: post._id} ,{headers: GetHeaders()}).then(res => {
            dispatch({type: actionTypes.ADD_REMOVE_LIKE_FROM_POST, data: {postId: post._id, likedBy: userData.id, state: 'remove'}})
        }).catch(err => {
            console.log(err);
        })
    }
}

export const addCommentToPost = (postId, comment) => {
    return (dispatch, getState) => {
        axios.post('api/v1/comment/add', {postId, comment}, {headers: GetHeaders()}).then(res => {
            dispatch({type: actionTypes.ADD_COMMENT_TO_POST, data: {postId, res: res.data}});
        }).catch(err => {
            console.log(err);
        })
    }
}