import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    infoUser: [],
    errMessage: '',
    data: {},
    doctorData: '',
    result: ''

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENDER_SUCCESS:
            // console.log(action);
            return {
                ...state,
                genders: action.data
            }
        case actionTypes.GET_GENDER_FAIL:
            return {
                ...state
            }
        case actionTypes.GET_POSITION_SUCCESS:
            // console.log(action);
            return {
                ...state,
                positions: action.data
            }
        case actionTypes.GET_POSITION_FAIL:
            return {
                ...state
            }
        case actionTypes.GET_ROLE_SUCCESS:
            // console.log(action);
            return {
                ...state,
                roles: action.data
            }
        case actionTypes.GET_ROLE_FAIL:
            return {
                ...state
            }
        case actionTypes.CREATE_NEW_USER_SUCCESS:
            // console.log(action);
            return {
                ...state,
                infoUser: action.data,
                errMessage: ''
            }
        case actionTypes.CREATE_NEW_USER_FAIL:
            return {
                ...state,
                errMessage: action.errMessage
            }
        case actionTypes.READ_ALL_USER_SUCCESS:
            // console.log(action);
            return {
                ...state,
                data: action.data,
                errMessage: ''
            }
        case actionTypes.READ_ALL_USER_FAIL:
            return {
                ...state,
                errMessage: action.errMessage
            }
        case actionTypes.READ_DOCTOR_SUCCESS:
            return {
                ...state,
                doctorData: action.data
            }
        // case actionTypes.DELETE_USER_SUCCESS:
        //     let listUsers = state.data.user
        //     let index = listUsers.forEach((item, index) => {
        //         if (item.email === action.email) {
        //             return index
        //         }
        //     })
        //     console.log(index   );
        //     return {
        //         ...state,
        //         data: action.data,
        //         errMessage: ''
        //     }
        case actionTypes.DELETE_USER_FAIL:
            return {
                ...state,
                errMessage: action.errMessage
            }
        case actionTypes.EDIT_USER_FAIL:
            return {
                ...state,
                errMessage: action.errMessage
            }
        case actionTypes.CREATE_INFOR_DOCTOR_SUCCESS:
            return {
                ...state,
                result: action.result
            }
        case actionTypes.CREATE_INFOR_DOCTOR_FAIL:
            return {
                ...state,
                result: action.result
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        default:
            return state;
    }
}

export default adminReducer;