import { Button } from "@components/button"
import { Category } from "@custom-types/category"
import { Spinner } from "@pages/login"
import { createMutation } from "@tanstack/solid-query"
import { useFetch } from "@utils/fetch"
import { queryClient } from "@utils/query"
import clsx from "clsx"
import { createSignal } from "solid-js"

type CategoryButtonProps = {
  category: Category
}

export const CategoryButton = (props: CategoryButtonProps) => {
  const { deleteCategory, categoriesQueryKey } = useFetch()
  const [isDeletingCategory, setIsDeletingCategory] = createSignal(false)

  const query = createMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries(categoriesQueryKey, { exact: true }),
    onMutate: () => setIsDeletingCategory(true),
    onSettled: () => setIsDeletingCategory(false)
  })

  return (
    <div
      class={clsx(
        "flex",
        "justify-center",
        "items-center",
        "flex-row",
        "w-36",
        "px-2",
        "py-1",
        "border-style",
        "rounded-md",
        "truncate"
      )}
    >
      <div class={clsx("text-color-style", "text-center", "text-sm", "truncate")}>
        {props.category.categoryName}
      </div>
      <div class={clsx("grow")} />
      <Button
        onClick={() => query.mutate(props.category.categoryId)}
        class={clsx("text-xs", "button-height-sm", "w-12")}
      >
        {isDeletingCategory() ? <Spinner /> : "del"}
      </Button>
    </div>
  )
}
