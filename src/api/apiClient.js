import axios from 'axios'

 const URL = 'https://bookstoreapi123.herokuapp.com'

const axiosClient = axios.create({
    baseURL: URL,
    headers: {
        "Content-type":'application/json; charset=utf-8'
    },
})


export default axiosClient