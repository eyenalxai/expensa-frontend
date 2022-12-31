import { queryClient } from "@config/solid-query"
import { ErrorResponse } from "@custom-types/error"
import { createFetch } from "@utils/fetch"
import { parseError } from "@utils/parse-error"
import { AxiosResponse } from "axios"
import { createSignal } from "solid-js"

export const createAddCategory = () => {
  const { addCategory, categoriesQueryKey } = createFetch()

  const [categoryName, setCategoryName] = createSignal("")
  const [isAddingCategory, setIsAddingCategory] = createSignal(false)
  const [error, setError] = createSignal(undefined as string | undefined)

  const handleSubmitAddCategoryForm = (
    e: Event & { submitter: HTMLElement } & {
      currentTarget: HTMLFormElement
      target: Element
    }
  ) => {
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
  }

  return {
    handleSubmitAddCategoryForm,
    categoryName,
    setCategoryName,
    isAddingCategory,
    setIsAddingCategory,
    error
  }
}
