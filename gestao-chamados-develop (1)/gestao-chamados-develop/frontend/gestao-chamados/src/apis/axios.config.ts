import axios, { AxiosInstance } from "axios";

const token = localStorage.getItem("rxct_token");

const axiosInstance: AxiosInstance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
});

const axiosTokenInstance: AxiosInstance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
});

export { axiosInstance, axiosTokenInstance };