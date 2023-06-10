import axios from 'axios'

export const api = axios.create({
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
    baseURL: 'http://localhost:57678/api/'
})

const errorHandler = (error) => {
    const statusCode = error.response?.status;

    if(statusCode && statusCode !== 401){
        console.log(error);
    }

    return Promise.reject(error);
}

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
})

api.interceptors.request.use(config => {

    const token = JSON.parse(localStorage.getItem('user')) === null ? '' : JSON.parse(localStorage.getItem('user')).token;

    if(token.trim() !== '' && token !== null){
        config.headers.Authorization = `Bearer ${token}`;  
    }
    

    return config;
})