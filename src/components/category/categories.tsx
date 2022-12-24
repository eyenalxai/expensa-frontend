import { Button } from "@components/button"
import { AddCategory } from "@components/category/add-category"
import { CategoryButton } from "@components/category/category-button"
import { useNavigate } from "@solidjs/router"
import { createQuery } from "@tanstack/solid-query"
import { useFetch } from "@utils/fetch"
import clsx from "clsx"
import { For, Show } from "solid-js"

export const Categories = () => {
  const navigate = useNavigate()
  const { fetchCategories } = useFetch()
  const query = createQuery(() => ["categories"], fetchCategories)

  return (
    <div class={clsx("flex", "flex-col", "justify-center", "items-center", "gap-2")}>
      <Button onClick={() => navigate("/")} class={clsx("py-1", "px-2")}>
        back
      </Button>
      <AddCategory />
      <Show when={query.data} keyed={true}>
        {(categories) => {
          if (categories.length === 0) {
            return <div class={clsx("text-color-style")}>no categories</div>
          }

          return (
            <div
              class={clsx(
                "flex",
                "flex-col",
                "justify-center",
                "items-center",
                "text-color-style",
                "gap-2"
              )}
            >
              <div
                class={clsx(
                  "flex",
                  "flex-row",
                  "gap-2",
                  "justify-center",
                  "items-center"
                )}
              >
                <div class={clsx("text-color-style")}>categories</div>
              </div>
              <div class={clsx("flex", "flex-col", "gap-2")}>
                <For each={categories}>
                  {(category) => <CategoryButton category={category} />}
                </For>
              </div>
            </div>
          )
        }}
      </Show>
    </div>
  )
}
