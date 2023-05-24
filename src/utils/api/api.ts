import axios from "axios";

export const $host = axios.create({
    baseURL: "http://localhost:5684/1.0/api",
})

export const $authHost = axios.create({
    baseURL: "http://localhost:5684/1.0/api",
    headers: {"Authorization": `Bearer ${localStorage.getItem('jwt-token')}`}
})
