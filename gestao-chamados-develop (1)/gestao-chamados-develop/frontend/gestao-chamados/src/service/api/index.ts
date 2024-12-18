import axios from "axios";

// const API_URL =  process.env.REACT_APP_API_BASE_URL ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api` : "http://localhost::7248/api";
const API_URL = "https://localhost:7248/api/"
const TOKEN = localStorage.getItem("rxct_token");

export const Api = axios.create({
    baseURL:API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
    }
});
