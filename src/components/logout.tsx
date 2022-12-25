import { Button } from "@components/button"
import { Spinner } from "@pages/login"
import { useAuth } from "@utils/auth-context"
import { createConfig } from "@utils/config"
import clsx from "clsx"
import { createSignal } from "solid-js"

export const Logout = () => {
  const { axiosInstance } = createConfig()
  const { setAccessToken } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = createSignal(false)

  const logout = () => {
    setIsLoggingOut(true)
    axiosInstance.post("/logout", {}, { withCredentials: true }).finally(() => {
      setAccessToken(null)
      setIsLoggingOut(false)
    })
  }

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
