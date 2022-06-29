import axios from 'axios'

 const URL = 'http://localhost:5000'

const axiosClient = axios.create({
    baseURL: URL,
    headers: {
        "Content-type":'application/json; charset=utf-8'
    },
})


export default axiosClient