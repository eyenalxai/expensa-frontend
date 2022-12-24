import axios from "axios"

export const createConfig = () => {
  const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN
  console.log(import.meta.env)
  const backendUrl = import.meta.env.DEV
    ? `http://${backendDomain}`
    : `https://${backendDomain}`

  const axiosInstance = axios.create()
  axiosInstance.defaults.baseURL = backendUrl

  return {
    axiosInstance
  }
}
