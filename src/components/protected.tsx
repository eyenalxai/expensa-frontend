import { useAuth } from "../App"
import { Show } from "solid-js"
import { Navigate, Outlet } from "@solidjs/router"

export const Protected = () => {
  const { accessToken } = useAuth()
  return (
    <Show when={accessToken()} fallback={<Navigate href={"/login"} />}>
      <Outlet />
    </Show>
  )
}
