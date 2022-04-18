import actionTypes from './actionTypes';
import { getAllCodeService, createNewUser, readAllUser, deleteUser, editUser, readDoctorServive, createInforDoctorService } from '../../services/adminService'



export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const getPositionsStart = () => {
    return async (dispatch) => {
        try {
            let result = await getAllCodeService('position')
            // console.log(result);
            if (result && result.data.errCode === 0) {
                // console.log('object');
                dispatch(getPositionsSuccess(result.data.typeCode))
            } else (
                dispatch(getPositionsFail())
            )
        } catch (error) {
            dispatch(getPositionsFail())
        }
    }
}
export const getPositionsSuccess = (result) => ({
    type: actionTypes.GET_POSITION_SUCCESS,
    data: result

})
export const getPositionsFail = () => ({
    type: actionTypes.GET_POSITION_FAIL

})

export const getGendersStart = () => {
    return async (dispatch) => {
        try {
            let result = await getAllCodeService('gender')
            // console.log(result);
            if (result && result.data.errCode === 0) {
                // console.log('object');
                dispatch(getGendersSuccess(result.data.typeCode))
            } else (
                dispatch(getGendersFail())
            )
        } catch (error) {
            dispatch(getGendersFail())
        }
    }
}
export const getGendersSuccess = (result) => ({
    type: actionTypes.GET_GENDER_SUCCESS,
    data: result

})
export const getGendersFail = () => ({
    type: actionTypes.GET_GENDER_FAIL

})
export const getRolesStart = () => {
    return async (dispatch) => {
        try {
            let result = await getAllCodeService('role')
            // console.log(result);
            if (result && result.data.errCode === 0) {
                // console.log('object');
                dispatch(getRolesSuccess(result.data.typeCode))
            } else (
                dispatch(getRolesFail())
            )
        } catch (error) {
            dispatch(getRolesFail())
        }
    }
}
export const getRolesSuccess = (result) => ({
    type: actionTypes.GET_ROLE_SUCCESS,
    data: result

})
export const getRolesFail = () => ({
    type: actionTypes.GET_ROLE_FAIL

})
export const createNewUserStart = (infoUser) => {
    return async (dispatch) => {
        try {
            // console.log(infoUser);
            let result = await createNewUser(infoUser)
            // console.log(result);
            if (result && result.data.errCode === 0) {
                dispatch(createNewUserSuccess(infoUser))
            } else {

                dispatch(createNewUserFail(result.data.message))
                // console.log(result.data.message);
            }

        } catch (error) {
            dispatch(createNewUserFail())
        }
    }
}
export const createNewUserSuccess = (result) => ({
    type: actionTypes.CREATE_NEW_USER_SUCCESS,
    data: result

})
export const createNewUserFail = (errMessage) => ({
    type: actionTypes.CREATE_NEW_USER_FAIL,
    errMessage: errMessage

})

export const readAllUserStart = () => {
    return async (dispatch) => {
        try {
            let result = await readAllUser('ALL')
            // console.log('res', result);
            if (result.data.errCode === 0) {
                dispatch(readAllUserSuccess(result.data))
            } else {
                dispatch(readAllUserFail(result.data.errMessage))
            }

        } catch (error) {
            dispatch(readAllUserFail())
        }
    }
}

export const readAllUserFail = (errMessage) => ({
    type: actionTypes.READ_ALL_USER_FAIL,
    errMessage
})
export const readAllUserSuccess = (data) => ({
    type: actionTypes.READ_ALL_USER_SUCCESS,
    data
})

export const deleteUserStart = (email) => {
    return async (dispatch) => {
        try {
            let result = await deleteUser(email)
            // console.log(result);
            if (result.data.errCode === 0) {
                dispatch(readAllUserStart())
            } else {
                dispatch(deleteUserFail(result.data.errMessage))
            }

        } catch (error) {
            dispatch(deleteUserFail('Error dispatch action Redux'))
        }
    }
}
export const deleteUserFail = (errMessage) => ({
    type: actionTypes.DELETE_USER_FAIL,
    errMessage
})
// export const deleteUserSuccess = (email) => ({
//     type: actionTypes.DELETE_USER_SUCCESS,
//     email
// })
export const editUserStart = (data) => {
    return async (dispatch) => {
        try {
            let result = await editUser(data)
            // console.log(data);
            if (result.data.errCode === 0) {
                dispatch(readAllUserStart())
            } else {
                dispatch(editUserFail(result.data.errMessage))
            }

        } catch (error) {
            dispatch(editUserFail('Error dispatch action Redux' + error))
        }
    }
}
export const editUserFail = (errMessage) => ({
    type: actionTypes.EDIT_USER_FAIL,
    errMessage
})

export const readDoctorStart = () => {
    return async (dispatch) => {
        try {
            let result = await readDoctorServive()
            // console.log(result);
            if (result.data.errCode === 0) {

                dispatch(readDoctorSuccess(result.data.data))
            } else {
                dispatch(editUserFail())
            }

        } catch (error) {
            dispatch(editUserFail('Error dispatch action Redux' + error))
        }
    }
}
export const readDoctorFail = () => ({
    type: actionTypes.READ_DOCTOR_FAIL,

})
export const readDoctorSuccess = (data) => ({
    type: actionTypes.READ_DOCTOR_SUCCESS,
    data: data
})
export const createInforDoctor = (dataDoctor) => {
    return async (dispatch) => {
        try {
            // console.log(dataDoctor);
            let result = await createInforDoctorService(dataDoctor)
            // console.log(result);
            if (result && result.data.errCode === 0) {
                dispatch(createInforDoctorSuccess(result.data))
            } else {

                dispatch(createNewUserFail(result.data))
                // console.log(result.data.message);
            }

        } catch (error) {
            dispatch(createNewUserFail())
        }
    }
}
export const createInforDoctorSuccess = (result) => ({
    type: actionTypes.CREATE_INFOR_DOCTOR_SUCCESS,
    result
})
export const createInforDoctorFail = (result) => ({
    type: actionTypes.CREATE_INFOR_DOCTOR_FAIL,
    result
})