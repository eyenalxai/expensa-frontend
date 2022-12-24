import { Navigate, Outlet } from "@solidjs/router"
import { useAuth } from "@utils/auth/context"
import { Show } from "solid-js"

export const ProtectedRoute = () => {
  const { accessToken } = useAuth()

  return (
    <Show when={accessToken()} keyed={false} fallback={<Navigate href={"/login"} />}>
      <Outlet />
    </Show>
  )
}
