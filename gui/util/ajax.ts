
import axios from 'axios';
axios.defaults.withCredentials = true;

// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "http://35.202.95.163:8080/";

const postRequest = async function post(url: string, data) {
    await axios.get(BASE_URL + 'sanctum/csrf-cookie', {
        withCredentials: true
    });

    return axios.post(BASE_URL + url, data, {
           withCredentials: true
    });
};

const getRequest = async function get(url: string) {
    await axios.get(BASE_URL + 'sanctum/csrf-cookie', {
        withCredentials: true
    });

    return axios.get(BASE_URL + url, {
           withCredentials: true
    });
};

export { postRequest, getRequest };