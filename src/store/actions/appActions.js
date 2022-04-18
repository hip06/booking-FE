import actionTypes from './actionTypes';
import { getDataSpecialtyService, getdataClinicsService } from '../../services/userServices'
import { getAllBookingByDoctorIdService } from '../../services/doctorServices'

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguages = (language) => ({
    type: actionTypes.CHANGELANGUAGE,
    language: language
})
export const getDataSpecialty = () => {
    return async (dispatch) => {
        try {
            let response = await getDataSpecialtyService()
            if (response && response.data.errCode === 0) {
                dispatch(getDataSpecialtySuccess(response.data))
            } else {
                dispatch(getDataSpecialtyFail(response.data))
            }

        } catch (error) {
            dispatch(getDataSpecialtyFail({
                errCode: -1,
                message: 'Fail from clientside..'
            }))
        }
    }
}
export const getDataSpecialtySuccess = (response) => ({
    type: actionTypes.GET_DATA_SPECIALTY_SUCCESS,
    data: response

})
export const getDataSpecialtyFail = (response) => ({
    type: actionTypes.GET_DATA_SPECIALTY_FAIL,
    data: response

})
export const getdataClinics = (id) => {
    return async (dispatch) => {
        try {
            let response = await getdataClinicsService(id)
            // console.log(response);
            if (response && response.data.errCode === 0) {
                dispatch(getdataClinicsSuccess(response.data))
            } else {
                dispatch(getdataClinicsFail(response.data))
            }

        } catch (error) {
            dispatch(getDataSpecialtyFail({
                errCode: -1,
                message: 'Fail from clientside..'
            }))
        }
    }
}
export const getdataClinicsSuccess = (response) => ({
    type: actionTypes.GET_DATA_CLINIC_SUCCESS,
    data: response

})
export const getdataClinicsFail = (response) => ({
    type: actionTypes.GET_DATA_CLINIC_FAIL,
    data: response

})
export const updateStatusVerify = (data) => {
    return async (dispatch) => {
        try {
            let response = await getAllBookingByDoctorIdService(data)
            // console.log(response);
            if (response && response.data.errCode === 0) {
                dispatch(updateStatusVerifySuccess(response.data))
            } else {
                dispatch(updateStatusVerifyFail(response.data))
            }

        } catch (error) {
            dispatch(updateStatusVerifyFail({
                errCode: -1,
                message: 'Fail from clientside..'
            }))
        }
    }
}
export const updateStatusVerifySuccess = (response) => ({
    type: actionTypes.UPDATE_STATUS_SUCCESS,
    data: response

})
export const updateStatusVerifyFail = (response) => ({
    type: actionTypes.UPDATE_STATUS_FAIL,
    data: response

})