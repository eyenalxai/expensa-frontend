import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { axiosInstance } from "./config/axios"
import { AccessToken } from "./type/token"
import { User } from "./type/user"

export function fetcher<T>(
  url: string,
  method: string,
  accessToken: string,
  setAccessToken: (accessToken: string | null) => void,
  body: BodyInit | null | undefined = null
): Promise<T> {
  const requestOptions: AxiosRequestConfig = {
    method,
    data: body,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  }

  return axiosInstance(url, requestOptions)
    .then((response: AxiosResponse<T>) => {
      if (response.status === 200) return response.data
      return Promise.reject(response)
    })
    .catch((err: AxiosError) => {
      const response = err.response
      if (response && response.status === 401) {
        return axiosInstance
          .post("/refresh", {}, { withCredentials: true })
          .then((res: AxiosResponse<AccessToken>) => {
            if (res.status === 200) {
              const { accessToken } = res.data
              setAccessToken(accessToken)

              // Repeat the request with the new access token
              return axiosInstance(url, {
                ...requestOptions,
                headers: {
                  ...requestOptions.headers,
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((response: AxiosResponse<T>) => {
                if (response.status === 200) return response.data
                return Promise.reject(response)
              })
            }
            setAccessToken(null)
            return Promise.reject(response)
          })
          .catch((err) => {
            console.error("Error refreshing token", err)
            return Promise.reject(err)
          })
      }
      return Promise.reject(response)
    })
}

export const useFetch = (
  accessToken: string,
  setAccessToken: (accessToken: string | null) => void
) => {
  const fetchProfile = () => fetcher<User>("/me", "GET", accessToken, setAccessToken)

  return { fetchProfile }
}
