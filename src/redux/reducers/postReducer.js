import * as actionTypes from '../constants/actionTypes';

const initState = {
    postData: [],
    hasMore: true,
    error: null
}

let postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_POSTS_DATA:
            return {
                ...state,
                postData: action.posts,
                hasMore: action.hasMore
            };
        case actionTypes.REMOVE_POSTS_DATA:
            return {
                ...state,
                postData: [],
                hasMore: true
            }
        case actionTypes.ADD_REMOVE_LIKE_FROM_POST:
            let postIndex = state.postData.findIndex(post => {
                return post._id === action.data.postId
            })
            let newPostData = [...state.postData];
            if(postIndex >= 0 && action.data.state === 'add') {
                newPostData[postIndex].numberOfLikes++;
                newPostData[postIndex].likedBy.push(action.data.likedBy);
            } else {
                newPostData[postIndex].numberOfLikes--;
                let likedByIndex = newPostData[postIndex].likedBy.findIndex(id => {
                    return id === action.data.likedBy
                })
                if (likedByIndex > -1) {
                    newPostData[postIndex].likedBy.splice(likedByIndex, 1);
                }
            }
            return {
                ...state,
                postData: newPostData
            };
            case actionTypes.ADD_COMMENT_TO_POST: 
                let data = action.data.res;
                let index = state.postData.findIndex(post => {
                    return post._id === action.data.postId
                })
                let NewPostData = [...state.postData];
                if(index >= 0){
                    let commentsArrayLength = NewPostData[index].comments.length;
                    let newComment = {comment: data.comment, _id: data._id, userId: {username: data.userId.username, _id: data.userId._id}};
                    if (commentsArrayLength === 2) {
                        NewPostData[index].comments.shift(); 
                        NewPostData[index].comments.push(newComment); 
                    } else {
                        NewPostData[index].comments.push(newComment); 
                    }
                }
                return {
                    ...state,
                    postData: NewPostData
                };
        default:
            return state;
    }
}

export default postReducer;