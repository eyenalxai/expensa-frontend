import { Loading } from "@components/loading"
import { Logout } from "@components/logout"
import { Outlet } from "@solidjs/router"
import { createProfileQuery } from "@utils/query/profile"
import clsx from "clsx"
import { Show } from "solid-js"

export const Main = () => {
  const { query } = createProfileQuery()

  return (
    <div class={clsx("flex", "mt-12", "justify-center")}>
      <div class={clsx("flex", "flex-col", "gap-3", "items-center")}>
        <div class={clsx("flex", "flex-row", "gap-3", "items-center")}>
          <div class={clsx("h-6", "text-color-style")}>
            <Show
              when={query.isSuccess && query.data}
              keyed={true}
              fallback={
                <div class={clsx("flex", "gap-2")}>
                  <h2>Hello,</h2>
                  <Loading />
                </div>
              }
            >
              {(user) => <h2>Hello, {user.username}</h2>}
            </Show>
          </div>
          <Logout />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
