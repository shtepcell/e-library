import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://10.240.240.40:8888/api'
});
