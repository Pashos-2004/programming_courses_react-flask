import axios from "axios";
export const proxy = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 3000,});
