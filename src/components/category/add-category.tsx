import { Button } from "@components/button"
import { Error } from "@components/error"
import { Input } from "@components/input"
import { ErrorResponse } from "@custom-types/error"
import { parseError } from "@utils/error"
import { useFetch } from "@utils/fetch"
import { queryClient } from "@utils/query"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import { createSignal, Show } from "solid-js"

export const AddCategory = () => {
  const { addCategory } = useFetch()

  const [categoryName, setCategoryName] = createSignal("")
  const [error, setError] = createSignal(undefined as string | undefined)

  return (
    <div class={clsx("flex", "flex-col", "gap-3")}>
      <form
        class={clsx("flex", "justify-center", "gap-3", "items-end")}
        onSubmit={(e) => {
          e.preventDefault()
          addCategory(categoryName())
            .then(() =>
              queryClient
                .invalidateQueries(["categories"], { exact: true })
                .then(() => setError(undefined))
            )
            .catch((r: AxiosResponse<ErrorResponse>) => setError(parseError(r)))
            .finally(() => {
              setCategoryName("")
            })
        }}
      >
        <Input
          label="category name"
          value={categoryName()}
          id="category-name"
          type="text"
          onChange={(e) => setCategoryName(e.currentTarget.value)}
        />
        <Button class={clsx("py-1", "px-3")} type={"submit"}>
          add
        </Button>
      </form>
      <Show when={error()} keyed={true}>
        {(error) => <Error text={error} />}
      </Show>
    </div>
  )
}
