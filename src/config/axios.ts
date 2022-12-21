import axios from "axios"

export const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = "http://localhost:8000"
