import axiosClient from "./apiClient"

const categoryApi = {
    getAll: ()=>{
        return axiosClient.get("/category")
    }
}

export default categoryApi