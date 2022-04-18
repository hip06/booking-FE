import axios from "axios";

export const getDetailsInforDoctorService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/get-details-infor-doctors?id=${id}`,
            })
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

export const getInforDoctorService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/get-infor-doctors?id=${id}`,
            })
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const updateInforDoctorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/update-infor-doctors`,
                data: data
            })
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

export const getTimeWorkService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/get-allcode?type=TIME`,
            })
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

export const bulkCreateSchedule = (dataForBulkCreate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/bulk-create-schedule`,
                data: dataForBulkCreate
            })
            console.log('check doctor service', response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const getScheduleDoctorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/get-doctor-schedule?id=${data.id}&date=${data.date}`,
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const getDataFromAllcodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/get-allcode?type=${type}`,
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const upsertDoctorInforService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/upsert-doctor-infors`,
                data
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const getDoctorBySpecialtyIdService = (idAndDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/get-doctor-by-id-specialty?id=${idAndDate.id}&date=${idAndDate.date}&type=${idAndDate.type}`,
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const getAllProvinceService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/get-allcode?type=PROVINCE`,
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const getAllBookingByDoctorIdService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/get-list-booking-by-doctorId?id=${data.id}&date=${data.date}`,
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const updateBookingAndSendRemadyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/update-status-bookking-and-send-remedy`,
                data: data
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export const deleteCompletedBooking = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'delete',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/delete-bookking-completed?token=${token}`,
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}