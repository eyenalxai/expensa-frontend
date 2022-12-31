import { queryClient } from "@config/solid-query"
import { createQuery } from "@tanstack/solid-query"
import { createFetch } from "@utils/fetch"

export const createProfileQuery = () => {
  const {
    fetchProfile,
    profileQueryKey,
    fetchCategories,
    categoriesQueryKey,
    fetchExpenses,
    expensesQueryKey
  } = createFetch()
  const query = createQuery(() => profileQueryKey, fetchProfile, {
    onSuccess: () =>
      queryClient
        .prefetchQuery({
          queryKey: categoriesQueryKey,
          queryFn: fetchCategories
        })
        .then(() =>
          queryClient.prefetchQuery({
            queryKey: expensesQueryKey,
            queryFn: fetchExpenses
          })
        )
  })

  return {
    query
  }
}
