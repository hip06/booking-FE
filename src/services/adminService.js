
import axios from '../axios';
require(`dotenv`).config()


let getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-allcode?type=${type}`)
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (infoUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/create-user`,
                data: infoUser
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let readAllUser = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/get-users?email=${email}`)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `delete`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/delete-user?email=${email}`
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `put`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/update-user`,
                data: data
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })

}
let readDoctorServive = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `get`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/get-doctors?type=R2`,
            })
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let createInforDoctorService = (dataDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/create-infor-doctors`,
                data: dataDoctor
            })
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
let createHandbookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: `post`,
                url: `${process.env.REACT_APP_BACKEND_URL}/api/create-handbook`,
                data: data
            })
            // console.log(response);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
export { getAllCodeService, createNewUser, readAllUser, deleteUser, editUser, readDoctorServive, createInforDoctorService, createHandbookService }