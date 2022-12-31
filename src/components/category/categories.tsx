import { Button } from "@components/button"
import { AddCategory } from "@components/category/add-category"
import { CategoryButton } from "@components/category/category-button"
import { useNavigate } from "@solidjs/router"
import { createCategoryQuery } from "@utils/query/category"
import clsx from "clsx"
import { For, Show } from "solid-js"

export const Categories = () => {
  const navigate = useNavigate()
  const { query } = createCategoryQuery()

  return (
    <div class={clsx("flex", "flex-col", "justify-center", "items-center", "gap-3")}>
      <Button
        onClick={() => navigate("/expenses")}
        class={clsx("button-height", "px-2")}
      >
        to expenses
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
