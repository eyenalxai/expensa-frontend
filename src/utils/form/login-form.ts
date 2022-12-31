import { ErrorResponse } from "@custom-types/error"
import { AccessToken } from "@custom-types/token"
import { useAuth } from "@utils/auth-context"
import { createFetch } from "@utils/fetch"
import { parseError } from "@utils/parse-error"
import { AxiosError, AxiosResponse } from "axios"
import { createSignal } from "solid-js"

export const createLogin = () => {
  const { setAccessToken } = useAuth()
  const { login } = createFetch()
  const [username, setUsername] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [error, setError] = createSignal(undefined as string | undefined)
  const [isLoggingIn, setIsLoggingIn] = createSignal(false)

  const handleSubmitLoginForm = (e: Event) => {
    e.preventDefault()
    setError(undefined)
    setIsLoggingIn(true)
    login(username(), password())
      .then((res: AxiosResponse<AccessToken>) => {
        if (res.status === 200) {
          setAccessToken(res.data.accessToken)
        }
      })
      .catch((r: AxiosError<ErrorResponse>) => setError(parseError(r)))
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoggingIn,
    handleSubmitLoginForm
  }
}
