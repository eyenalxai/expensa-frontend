import { Logout } from "@components/logout"
import { Spinner } from "@components/spinner"
import { queryClient } from "@config/solid-query"
import { Outlet } from "@solidjs/router"
import { createQuery } from "@tanstack/solid-query"
import { createFetch } from "@utils/fetch"
import clsx from "clsx"
import { Show } from "solid-js"

const createProfileQuery = () => {
  const { fetchProfile, profileQueryKey, fetchCategories, categoriesQueryKey } =
    createFetch()

  const query = createQuery(() => profileQueryKey, fetchProfile, {
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: categoriesQueryKey,
        queryFn: fetchCategories
      })
    }
  })

  return {
    query
  }
}

export const Main = () => {
  const { query } = createProfileQuery()

  return (
    <div class={clsx("flex", "mt-12", "justify-center")}>
      <div class={clsx("flex", "flex-col", "gap-3", "items-center")}>
        <div class={clsx("flex", "flex-row", "gap-3", "items-center")}>
          <div class={"h-6"}>
            <Show
              when={query.isSuccess && query.data}
              keyed={true}
              fallback={<Spinner />}
            >
              {(user) => (
                <h2 class={clsx("text-slate-700", "dark:text-slate-300")}>
                  Hello, {user.username}
                </h2>
              )}
            </Show>
          </div>
          <Logout />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
