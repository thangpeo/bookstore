import axiosClient from "./apiClient"

const bannerApi = {
    getAll: ()=>{
        return axiosClient.get('/banner')
    }
}

export default bannerApi