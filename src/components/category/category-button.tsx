import { Button } from "@components/button"
import { Category } from "@custom-types/category"
import { createMutation } from "@tanstack/solid-query"
import { useFetch } from "@utils/fetch"
import { queryClient } from "@utils/query"
import clsx from "clsx"

type CategoryButtonProps = {
  category: Category
}

export const CategoryButton = (props: CategoryButtonProps) => {
  const { deleteCategory } = useFetch()

  const query = createMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries(["categories"], { exact: true })
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
        class={clsx("text-xs", "py-1", "px-2")}
      >
        del
      </Button>
    </div>
  )
}
