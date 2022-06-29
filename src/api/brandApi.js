import axiosClient from "./apiClient"

const brandApi = {
    getAll: ()=>{
        return axiosClient.get("/brand")
    }
}
export default brandApi