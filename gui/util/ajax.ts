
import axios from 'axios';

const BASE_URL = "http://localhost:8000/";

const postRequest = async function post(url: string, data) {
    return await axios.get(BASE_URL + 'sanctum/csrf-cookie', {
        withCredentials: true
    }).then(response => {
        return axios.post(BASE_URL + url, data, {
           withCredentials: true
        });
    });
};

const getRequest = async function get(url: string) {
    return await axios.get(BASE_URL + 'sanctum/csrf-cookie', {
        withCredentials: true
    }).then(response => {
       return axios.get(BASE_URL + url, {
           withCredentials: true
       });
    });
};

export { postRequest, getRequest };