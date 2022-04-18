import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null,


}

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    },
    specialty: null,
    clinic: null,
    listBooking: null,
    isUpdateStatus: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case actionTypes.CHANGELANGUAGE:
            return {
                ...state,
                language: action.language
            }
        case actionTypes.GET_DATA_SPECIALTY_SUCCESS:
            return {
                ...state,
                specialty: action.data
            }
        case actionTypes.GET_DATA_SPECIALTY_FAIL:
            return {
                ...state,
                specialty: action.data
            }
        case actionTypes.GET_DATA_CLINIC_SUCCESS:
            return {
                ...state,
                clinic: action.data
            }
        case actionTypes.GET_DATA_CLINIC_FAIL:
            return {
                ...state,
                clinic: action.data
            }
        case actionTypes.UPDATE_STATUS_SUCCESS:
            // console.log(action);
            return {
                ...state,
                listBooking: action.data.response,
                // isUpdateStatus: !state.isUpdateStatus
            }

        case actionTypes.UPDATE_STATUS_FAIL:
            return {
                ...state,
                listBooking: action.data.response || []
            }
        default:
            return state;
    }
}

export default appReducer;