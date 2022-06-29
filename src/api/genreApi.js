import axiosClient from "./apiClient"

const genreApi = {
    getAll: ()=>{
        return axiosClient.get("/genre")
    }
}
export default genreApi