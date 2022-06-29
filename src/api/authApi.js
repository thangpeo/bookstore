import apiClient from './apiClient'
const authApi = {
    login: (payload) => {
        return apiClient.post('/user/login', payload)
    },
    register: (payload) => {
        return apiClient.post("/user/register", payload)
    }
}
export default authApi