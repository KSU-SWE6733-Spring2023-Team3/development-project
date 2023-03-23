
import axios from 'axios';

const postRequest = async function post(url: string, data: FormData) {
    return await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        return axios.post('http://localhost:8000/' + url, data, {
           withCredentials: true
        });
    });
};

const getRequest = async function get(url: string, params) {
    return await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
       return axios.get('http://localhost:8000/' + url, {
           withCredentials: true
       });
    });
};

export { postRequest, getRequest };