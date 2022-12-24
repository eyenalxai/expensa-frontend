import { AuthContext, AuthContextProps } from "@utils/auth/context"
import { createSignal, JSX } from "solid-js"

type AuthContextProviderProps = {
  children: JSX.Element
}

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [accessToken, setAccessToken] = createSignal(null as string | null)

  const authContextValue: AuthContextProps = { accessToken, setAccessToken }

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
