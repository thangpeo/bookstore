import axiosClient from "./apiClient"

const publisherApi = {
    getAll: ()=>{
        return axiosClient.get('/publisher')
    }
}

export default publisherApi