import { Logout } from "@components/logout"
import { Outlet } from "@solidjs/router"
import { createQuery } from "@tanstack/solid-query"
import { useFetch } from "@utils/fetch"
import { queryClient } from "@utils/query"
import clsx from "clsx"
import { Show } from "solid-js"

export const Main = () => {
  const { fetchProfile, profileQueryKey, categoriesQueryKey } = useFetch()
  const query = createQuery(() => profileQueryKey, fetchProfile, {
    onSuccess: () => {
      queryClient.prefetchQuery(categoriesQueryKey)
    }
  })

  return (
    <div class={clsx("flex", "mt-12", "justify-center")}>
      <Show when={query.isSuccess && query.data} keyed={true}>
        {(user) => (
          <div class={clsx("flex", "flex-col", "gap-3", "items-center")}>
            <div class={clsx("flex", "flex-row", "gap-4", "items-center")}>
              <h2 class={clsx("text-slate-700", "dark:text-slate-300")}>
                Hello, {user.username}!{" "}
              </h2>
              <Logout />
            </div>
            <Outlet />
          </div>
        )}
      </Show>
    </div>
  )
}
