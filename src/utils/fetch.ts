import { Category } from "@custom-types/category"
import { AccessToken } from "@custom-types/token"
import { User } from "@custom-types/user"
import { useAuth } from "@utils/auth/context"
import { createConfig } from "@utils/config"
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

export function fetcher<T>(
  url: string,
  method: string,
  accessToken: string,
  setAccessToken: (accessToken: string | null) => void,
  body: BodyInit | null | undefined = null
): Promise<T> {
  const { axiosInstance } = createConfig()

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
      if (response.status === 200 || response.status === 201) return response.data
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
              })
                .then((response: AxiosResponse<T>) => {
                  if (response.status === 200 || response.status === 201)
                    return response.data
                  return Promise.reject(response)
                })
                .catch((err: AxiosError) => {
                  if (err.response && err.response.status === 401) {
                    setAccessToken(null)
                  }
                  return Promise.reject(err)
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

export const useFetch = () => {
  const { axiosInstance } = createConfig()
  const { accessToken, setAccessToken } = useAuth()

  const auth = (username: string, password: string) =>
    axiosInstance.post(
      "/auth",
      {
        username,
        password
      },
      { withCredentials: true }
    )

  const fetchProfile = () =>
    fetcher<User>("/me/", "GET", accessToken() as string, setAccessToken)

  const fetchCategories = () =>
    fetcher<Category[]>("/category/", "GET", accessToken() as string, setAccessToken)

  const deleteCategory = (id: number) =>
    fetcher(
      `/category/${id.toString()}`,
      "DELETE",
      accessToken() as string,
      setAccessToken
    )

  const addCategory = (categoryName: string) =>
    fetcher<never>(
      "/category/",
      "POST",
      accessToken() as string,
      setAccessToken,
      JSON.stringify({ categoryName })
    )

  return { auth, fetchProfile, fetchCategories, addCategory, deleteCategory }
}
