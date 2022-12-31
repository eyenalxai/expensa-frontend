import axios from "axios"

const getBaseURL = () => {
  const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN
  return import.meta.env.PROD ? `https://${backendDomain}` : `http://${backendDomain}`
}

export const axiosInstance = axios.create({
  baseURL: getBaseURL()
})
