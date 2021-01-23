import * as actionTypes from '../constants/actionTypes'

export const addUserData = (user) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.ADD_USER_DATA, user})
    }
}

export const removeUserData = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.REMOVE_USER_DATA})
    }
}