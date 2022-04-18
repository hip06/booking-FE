import axios from "axios";


let getUsers = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get-users?email=${email}`)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

let createUser = async (dataUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let reponse = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/create-user`,
                headers: {},
                data: dataUser
            });
            resolve(reponse)
        } catch (error) {
            reject(error)
        }
    })
}
let updateUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `put`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/update-user`,
                headers: {},
                data: user
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/delete-user?email=${user.email}`)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}


let checkLogin = (userInfo) => {
    // console.log(userInfo);
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/login`,
                headers: {},
                data: userInfo
            })
            resolve(response)
        } catch (error) {
            reject({ errMessage: error })
        }
    })
}
let upsertBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/upsert-patient-infors`,
                data: data
            })
            resolve(response)

        } catch (error) {
            reject(`Error: `, error)
        }
    })
}
let verifyEmailService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `get`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/verify-booking?doctorId=${data.doctorId}&token=${data.token}`,
            })
            resolve(response)

        } catch (error) {
            reject(`Error: `, error)
        }
    })
}
let createSpecialty = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/create-specialty`,
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(`Error: `, error)
        }
    })
}
let createClinic = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/create-clinic`,
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(`Error: `, error)
        }
    })
}
let getDataSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `get`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/read-specialty`,

            })
            resolve(response)

        } catch (error) {
            reject(`Error: `, error)
        }
    })
}
let getdataClinicsService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `get`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/read-clinic?id=${id}`,

            })
            resolve(response)

        } catch (error) {
            reject(`Error: `, error)
        }
    })
}
let getDataHandbook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `get`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/read-handbook?id=${id}`,
            })
            resolve(response)

        } catch (error) {
            reject(`Error: `, error)
        }
    })
}


export {
    getUsers, createUser, updateUser, deleteUser, checkLogin, upsertBooking, verifyEmailService, createSpecialty, getDataSpecialtyService,
    createClinic, getdataClinicsService, getDataHandbook
}