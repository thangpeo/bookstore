import apiClient from './apiClient'
const userApi = {

    getUserInfo: (username) => {
        return apiClient.post("/user", { username })
    },
    updateInfo: (payload) => {
        return apiClient.patch("/user/update", payload)
    },
    changePassword: (payload) => {
        return apiClient.patch("/user/changepassword", payload)
    },
    getShippingAddress: (username) => {
        return apiClient.post("/user/shippingaddress", { username })
    },
    getShippingAddressById: (username, id) => {
        return apiClient.post("/user/shippingaddress/" + id, { username })
    },
    addShippingAddress: (payload) => {
        return apiClient.post("/user/shippingaddress", payload)
    },
    removeShippingAddress: (id) => {
        return apiClient.delete("/user/shippingaddress/" + id)
    },
    updateShippingAddress: (payload) => {
        return apiClient.put("/user/shippingaddress", payload)
    }
}
export default userApi
