import { Categories } from "@components/category/categories"
import { Expenses } from "@components/expense/expenses"
import { ProtectedRoute } from "@components/protected/protected-route"
import { axiosInstance } from "@config/axios"
import { AccessToken } from "@custom-types/token"
import { Login } from "@pages/login"
import { Main } from "@pages/main"
import { Navigate, Route, Routes } from "@solidjs/router"
import { useAuth } from "@utils/auth-context"
import { AxiosResponse } from "axios"
import { createEffect, createSignal, Match, Switch } from "solid-js"

export const App = () => {
  const { accessToken, setAccessToken } = useAuth()
  const [isCheckingAuth, setIsCheckingAuth] = createSignal(true)

  createEffect(() => {
    axiosInstance
      .post("/refresh_tokens", {}, { withCredentials: true })
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
              <Route path="expenses" component={Expenses} />
              <Route path="categories" component={Categories} />
              <Route path="*" element={<Navigate href={"/expenses"} />} />
            </Route>
          </Route>
          <Route
            path="/login"
            element={accessToken() ? <Navigate href={"/expenses"} /> : <Login />}
          />
        </Routes>
      </Match>
    </Switch>
  )
}
