import * as actionTypes from '../constants/actionTypes';

const initState = {
    userData: null
}

let userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER_DATA:
            return {
                ...state,
                userData: action.user
            };
        case actionTypes.REMOVE_USER_DATA:
            return {
                ...state,
                userData: null
            }
        default:
            return state;
    }
}

export default userReducer;