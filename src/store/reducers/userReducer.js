import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userInfoExeptionImage: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            // console.log(action);
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                userInfoExeptionImage: {
                    ...action.userInfo,
                    image: '',
                    email: ''
                }
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                userInfoExeptionImage: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                userInfoExeptionImage: null
            }
        default:
            return state;
    }
}

export default userReducer;