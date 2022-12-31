import { createQuery } from "@tanstack/solid-query"
import { createFetch } from "@utils/fetch"

export const createCategoryQuery = () => {
  const { fetchCategories, categoriesQueryKey } = createFetch()
  const query = createQuery(() => categoriesQueryKey, fetchCategories)

  return {
    query
  }
}
