import { createContext, createSignal, useContext } from "solid-js"
import { Router } from "@solidjs/router"
import { Root } from "./root"

const AuthContext = createContext<{
  accessToken: () => string | null
  setAccessToken: (accessToken: string | null) => void
}>()
export const useAuth = () => useContext(AuthContext)!

export const App = () => {
  const [accessToken, setAccessToken] = createSignal(null as string | null)
  const authContext = {
    accessToken,
    setAccessToken
  }

  return (
    <Router>
      <AuthContext.Provider value={authContext}>
        <Root />
      </AuthContext.Provider>
    </Router>
  )
}
