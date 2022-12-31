import { Button } from "@components/button"
import { Loading } from "@components/loading"
import { queryClient } from "@config/solid-query"
import { Category } from "@custom-types/category"
import { createMutation } from "@tanstack/solid-query"
import { createFetch } from "@utils/fetch"
import clsx from "clsx"
import { createSignal } from "solid-js"

type CategoryButtonProps = {
  category: Category
}

export const CategoryButton = (props: CategoryButtonProps) => {
  const { disableCategory, categoriesQueryKey } = createFetch()
  const [isDisablingCategory, setIsDisablingCategory] = createSignal(false)

  const query = createMutation(disableCategory, {
    onSuccess: () => queryClient.invalidateQueries(categoriesQueryKey, { exact: true }),
    onMutate: () => setIsDisablingCategory(true),
    onSettled: () => setIsDisablingCategory(false)
  })

  return (
    <div
      class={clsx(
        "flex",
        "justify-center",
        "items-center",
        "flex-row",
        "w-48",
        "px-1.5",
        "py-1.5",
        "pl-3",
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
        {isDisablingCategory() ? <Loading /> : "del"}
      </Button>
    </div>
  )
}
