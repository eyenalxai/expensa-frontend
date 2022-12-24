import { BackButton } from "@components/back-button"
import { Categories } from "@components/category/categories"
import { ProtectedRoute } from "@components/protected-route"
import { AccessToken } from "@custom-types/token"
import { Login } from "@pages/login"
import { Main } from "@pages/main"
import { Navigate, Route, Routes } from "@solidjs/router"
import { useAuth } from "@utils/auth/context"
import { createConfig } from "@utils/config"
import { AxiosResponse } from "axios"
import { createEffect, createSignal, Match, Switch } from "solid-js"

export const App = () => {
  const { axiosInstance } = createConfig()
  const { accessToken, setAccessToken } = useAuth()
  const [isCheckingAuth, setIsCheckingAuth] = createSignal(true)

  createEffect(() => {
    axiosInstance
      .post("/refresh", {}, { withCredentials: true })
      .then((res: AxiosResponse<AccessToken>) => {
        if (res.status === 200) {
          setAccessToken(res.data.accessToken)
          return
        }
        setAccessToken(null)
      })
      .catch(() => setAccessToken(null))
      .finally(() => {
        setIsCheckingAuth(false)
      })
  })

  return (
    <Switch>
      <Match when={!isCheckingAuth()} keyed={false}>
        <Routes>
          <Route path="" component={ProtectedRoute}>
            <Route path="/" component={Main}>
              <Route path="" component={BackButton} />
              <Route path={"categories"} component={Categories} />
              <Route path="*" element={<Navigate href={"/"} />} />
            </Route>
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
