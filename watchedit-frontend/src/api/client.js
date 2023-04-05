import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:5023/"
});

client.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 404) {
        window.location.assign("/404");
    }

    return Promise.reject(error);
});

export default client;