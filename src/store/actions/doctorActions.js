import actionTypes from "./actionTypes";
import * as doctorServices from '../../services'

export const getDetailsInforDoctor = (id) => {
    return async (dispatch) => {
        try {
            let response = await doctorServices.getDetailsInforDoctorService(id)
            // console.log('check response: ', response);
            if (response && response.data.errCode === 0) {
                dispatch(getDetailsInforDoctorSuccess(response.data))
            } else {
                dispatch(getDetailsInforDoctorFail(response.data))
            }
        } catch (error) {
            dispatch(getDetailsInforDoctorFail({ errCode: 3, message: 'Error fire acions' }))
        }
    }

}
export const getDetailsInforDoctorSuccess = (data) => ({
    type: actionTypes.GET_DETAILS_DOCTOR_SUCCESS,
    data
})
export const getDetailsInforDoctorFail = (data) => ({
    type: actionTypes.GET_DETAILS_DOCTOR_FAIL,
    data
})


export const dataDoctorMarkdown = (id) => {
    return async (dispatch) => {
        try {
            // console.log(id);
            let response = await doctorServices.getInforDoctorService(id)
            // console.log('check response: ', response);
            if (response && response.data.errCode === 0) {
                dispatch(dataDoctorMarkdownSuccess(response.data))
            } else {
                dispatch(dataDoctorMarkdownFail(response.data))
            }
        } catch (error) {
            dispatch(dataDoctorMarkdownFail({ errCode: 3, message: 'Error fire acions' }))
        }
    }

}
export const dataDoctorMarkdownSuccess = (data) => ({
    type: actionTypes.GET_DOCTOR_SUCCESS,
    data
})
export const dataDoctorMarkdownFail = (data) => ({
    type: actionTypes.GET_DOCTOR_FAIL,
    data
})


export const updateInforDoctor = (data) => {
    return async (dispatch) => {
        try {
            let response = await doctorServices.updateInforDoctorService(data)
            // console.log('check response: ', response);
            if (response && response.data.errCode === 0) {
                dispatch(updateInforDoctorSuccess(response.data))
            } else {
                dispatch(updateInforDoctorFail(response.data))
            }
        } catch (error) {
            dispatch(updateInforDoctorFail({ errCode: 3, message: 'Error fire acions' }))
        }
    }

}
export const updateInforDoctorSuccess = (data) => ({
    type: actionTypes.UPDATE_DOCTOR_SUCCESS,
    data
})
export const updateInforDoctorFail = (data) => ({
    type: actionTypes.UPDATE_DOCTOR_FAIL,
    data
})
//get time doctor
export const getTimeWork = (data) => {
    return async (dispatch) => {
        try {
            let response = await doctorServices.getTimeWorkService(data)
            if (response && response.data.errCode === 0) {
                // console.log('check response: ', response.data);
                dispatch(getTimeWorkSuccess(response.data))
            } else {
                dispatch(getTimeWorkFail(response.data))
            }
        } catch (error) {
            dispatch(getTimeWorkFail({ errCode: 3, message: 'Error fire acions' }))
        }
    }

}
export const getTimeWorkSuccess = (data) => ({
    type: actionTypes.GET_TIME_WORK_DOCTOR_SUCCESS,
    data
})
export const getTimeWorkFail = (data) => ({
    type: actionTypes.GET_TIME_WORK_DOCTOR_FAIL,
    data
})
export const getScheduleDoctor = (data) => {
    return async (dispatch) => {
        try {
            let response = await doctorServices.getScheduleDoctorService(data)
            // console.log(response);
            if (response && response.data.errCode === 0) {
                // console.log('check response: ', response.data);
                dispatch(getScheduleDoctorSuccess(response.data))
            } else {
                dispatch(getScheduleDoctorFail(response.data))
            }
        } catch (error) {
            dispatch(getScheduleDoctorFail({ errCode: 3, message: 'Error fire acions' }))
        }
    }
}
export const getScheduleDoctorSuccess = (data) => ({
    type: actionTypes.GET_SCHEDULE_DOCTOR_SUCCESS,
    data
})
export const getScheduleDoctorFail = (data) => ({
    type: actionTypes.GET_SCHEDULE_DOCTOR_FAIL,
    data
})
export const getDataFromAllcode = (type) => {
    return async (dispatch) => {
        try {
            let response = await doctorServices.getDataFromAllcodeService(type)
            // console.log(response);
            switch (type) {
                case 'price':
                    if (response && response.data.errCode === 0) {
                        // console.log('check response: ', response.data);
                        dispatch(getPriceFromAllcodeSuccess(response.data))
                    } else {
                        dispatch(getPriceFromAllcodeFail(response.data))
                    }
                    break;
                case 'payment':
                    if (response && response.data.errCode === 0) {
                        // console.log('check response: ', response.data);
                        dispatch(getPaymentFromAllcodeSuccess(response.data))
                    } else {
                        dispatch(getPaymentFromAllcodeFail(response.data))
                    }
                    break;
                case 'province':
                    if (response && response.data.errCode === 0) {
                        // console.log('check response: ', response.data);
                        dispatch(getProvinceFromAllcodeSuccess(response.data))
                    } else {
                        dispatch(getProvinceFromAllcodeFail(response.data))
                    }
                    break;



                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            // dispatch(getPriceFromAllcodeFail({ errCode: 3, message: 'Error fire acions' }))
        }
    }
}
export const getPriceFromAllcodeSuccess = (data) => ({
    type: actionTypes.GET_PRICE_SUCCESS,
    data
})
export const getPriceFromAllcodeFail = (data) => ({
    type: actionTypes.GET_PRICE_FAIL,
    data
})
export const getPaymentFromAllcodeSuccess = (data) => ({
    type: actionTypes.GET_PAYMENT_SUCCESS,
    data
})
export const getPaymentFromAllcodeFail = (data) => ({
    type: actionTypes.GET_PAYMENT_FAIL,
    data
})
export const getProvinceFromAllcodeSuccess = (data) => ({
    type: actionTypes.GET_PROVINCE_SUCCESS,
    data
})
export const getProvinceFromAllcodeFail = (data) => ({
    type: actionTypes.GET_PROVINCE_FAIL,
    data
})

export const upsertDoctorInfor = (data) => {
    return async (dispatch) => {
        try {
            let response = await doctorServices.upsertDoctorInforService(data)
            return response
        } catch (error) {
            dispatch(getScheduleDoctorFail({ errCode: 3, message: 'Error fire acions' }))
        }
    }
}
