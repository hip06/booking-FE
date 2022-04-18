import actionTypes from '../actions/actionTypes';

const initialState = {
    detailsInforDoctor: '',
    markdownDoctor: '',
    updateDoctorResponse: '',
    timeArray: null,
    schedule: null,
    priceData: null,
    paymentData: null,
    provinceData: null,


}

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAILS_DOCTOR_SUCCESS:
            // console.log(action);
            return {
                ...state,
                detailsInforDoctor: action.data
            }
        case actionTypes.GET_DETAILS_DOCTOR_FAIL:
            // console.log(action);
            return {
                ...state,
                detailsInforDoctor: action.data
            }
        case actionTypes.GET_DOCTOR_SUCCESS:
            // console.log(action);
            return {
                ...state,
                markdownDoctor: action.data
            }
        case actionTypes.GET_DOCTOR_FAIL:
            // console.log(action);
            return {
                ...state,
                markdownDoctor: action.data
            }
        case actionTypes.UPDATE_DOCTOR_SUCCESS:
            // console.log(action);
            return {
                ...state,
                updateDoctorResponse: action.data
            }
        case actionTypes.UPDATE_DOCTOR_FAIL:
            // console.log(action);
            return {
                ...state,
                updateDoctorResponse: action.data
            }
        case actionTypes.GET_TIME_WORK_DOCTOR_SUCCESS:
            // console.log(action);
            return {
                ...state,
                timeArray: action.data.typeCode
            }
        case actionTypes.GET_TIME_WORK_DOCTOR_FAIL:
            // console.log(action);
            return {
                ...state,
                timeArray: action.data.typeCode
            }
        case actionTypes.GET_SCHEDULE_DOCTOR_SUCCESS:
            // console.log(action);
            return {
                ...state,
                schedule: action.data.response
            }
        case actionTypes.GET_SCHEDULE_DOCTOR_FAIL:
            // console.log(action);
            return {
                ...state,
                schedule: []
            }
        case actionTypes.GET_PRICE_SUCCESS:
            // console.log(action);
            return {
                ...state,
                priceData: action.data.typeCode
            }
        case actionTypes.GET_PRICE_FAIL:
            // console.log(action);
            return {
                ...state,
                priceData: null
            }
        case actionTypes.GET_PAYMENT_SUCCESS:
            // console.log(action);
            return {
                ...state,
                paymentData: action.data.typeCode
            }
        case actionTypes.GET_PAYMENT_FAIL:
            // console.log(action);
            return {
                ...state,
                paymentData: null
            }
        case actionTypes.GET_PROVINCE_SUCCESS:
            // console.log(action);
            return {
                ...state,
                provinceData: action.data.typeCode
            }
        case actionTypes.GET_PROVINCE_FAIL:
            // console.log(action);
            return {
                ...state,
                provinceData: null
            }





        default:
            return state;
    }
}

export default doctorReducer;