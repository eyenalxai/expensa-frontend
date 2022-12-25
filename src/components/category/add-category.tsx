import { Button } from "@components/button"
import { Error } from "@components/error"
import { Input } from "@components/input"
import { ErrorResponse } from "@custom-types/error"
import { Spinner } from "@pages/login"
import { parseError } from "@utils/error"
import { useFetch } from "@utils/fetch"
import { queryClient } from "@utils/query"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import { createSignal, Show } from "solid-js"

export const AddCategory = () => {
  const { addCategory, categoriesQueryKey } = useFetch()

  const [categoryName, setCategoryName] = createSignal("")
  const [error, setError] = createSignal(undefined as string | undefined)
  const [isAddingCategory, setIsAddingCategory] = createSignal(false)

  return (
    <div class={clsx("flex", "flex-col", "gap-3")}>
      <form
        class={clsx("flex", "justify-center", "gap-3", "items-end")}
        onSubmit={(e) => {
          setIsAddingCategory(true)
          e.preventDefault()
          addCategory(categoryName())
            .then(() =>
              queryClient
                .invalidateQueries(categoriesQueryKey)
                .then(() => setError(undefined))
            )
            .catch((r: AxiosResponse<ErrorResponse>) => setError(parseError(r)))
            .finally(() => {
              setIsAddingCategory(false)
            })
        }}
      >
        <Input
          class={clsx("h-8")}
          label="category name"
          id="category-name"
          type="text"
          onChange={(e) => setCategoryName(e.currentTarget.value)}
        />
        <Button class={clsx("button-height", "w-12")} type={"submit"}>
          {isAddingCategory() ? <Spinner /> : "add"}
        </Button>
      </form>
      <Show when={error()} keyed={true}>
        {(error) => <Error text={error} />}
      </Show>
    </div>
  )
}
