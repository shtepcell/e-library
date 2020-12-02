import axios from 'axios';

const { SERVER_HOST, SERVER_PORT } = process.env;

export const request = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/api`,
    withCredentials: true,
});
