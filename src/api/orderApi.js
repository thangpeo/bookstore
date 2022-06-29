import apiClient from './apiClient'
const orderApi = {
    getAll: (payload) => {
        return apiClient.post("/order", payload)
    },
    getOrder: (username, id) => {
        return apiClient.post(`/order/getById/${id}`, {username})
    },
    addOrder: (payload)=>{
        return apiClient.post('/order/add', payload)
    }
}
export default orderApi