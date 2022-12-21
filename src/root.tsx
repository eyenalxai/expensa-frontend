import { Component, createEffect, createSignal, Match, Switch } from "solid-js"
import { Navigate, Route, Routes } from "@solidjs/router"
import { axiosInstance } from "./config/axios"
import { AxiosResponse } from "axios"
import { AccessToken } from "./type/token"
import { Hello } from "./components/hello"
import { useAuth } from "./App"
import { Login } from "./components/login"
import { Protected } from "./components/protected"

export const Root: Component = () => {
  const { accessToken, setAccessToken } = useAuth()
  const [isLoading, setIsLoading] = createSignal(true)

  createEffect(() => {
    axiosInstance
      .post("/refresh", {}, { withCredentials: true })
      .then((res: AxiosResponse<AccessToken>) => {
        if (res.status === 200) {
          setAccessToken(res.data.accessToken)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  return (
    <Switch fallback={<div>Loading...</div>}>
      <Match when={!isLoading()} keyed={false}>
        <Routes>
          <Route path="" component={Protected}>
            <Route path="/" element={<Hello />} />
          </Route>
          <Route
            path="/login"
            element={accessToken() ? <Navigate href={"/"} /> : <Login />}
          />
        </Routes>
      </Match>
    </Switch>
  )
}
