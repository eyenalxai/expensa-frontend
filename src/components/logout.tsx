import { Button } from "@components/button"
import { Spinner } from "@components/spinner"
import { axiosInstance } from "@config/axios"
import { useAuth } from "@utils/auth-context"
import clsx from "clsx"
import { createSignal } from "solid-js"

const createLogout = () => {
  const { setAccessToken } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = createSignal(false)

  const logout = () => {
    setIsLoggingOut(true)
    axiosInstance.post("/logout", {}, { withCredentials: true }).finally(() => {
      setAccessToken(null)
      setIsLoggingOut(false)
    })
  }

  return {
    isLoggingOut,
    logout
  }
}

export const Logout = () => {
  const { isLoggingOut, logout } = createLogout()

  return (
    <Button
      class={clsx("button-height", "px-2")}
      onClick={() => logout()}
      type={"button"}
    >
      {isLoggingOut() ? <Spinner /> : "logout"}
    </Button>
  )
}
