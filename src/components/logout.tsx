import { Button } from "@components/button"
import { useAuth } from "@utils/auth/context"
import { createConfig } from "@utils/config"
import clsx from "clsx"

export const Logout = () => {
  const { axiosInstance } = createConfig()
  const { setAccessToken } = useAuth()

  const logout = () => {
    axiosInstance.post("/logout", {}, { withCredentials: true }).finally(() => {
      setAccessToken(null)
    })
  }

  return (
    <Button class={clsx("px-2", "py-1")} onClick={() => logout()} type={"button"}>
      logout
    </Button>
  )
}
