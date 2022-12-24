import { Accessor, Context, createContext, Setter, useContext } from "solid-js"

export type AuthContextProps = {
  accessToken: Accessor<string | null>
  setAccessToken: Setter<string | null>
}

export const AuthContext = createContext() as Context<AuthContextProps>

export function useAuth() {
  return useContext(AuthContext)
}
