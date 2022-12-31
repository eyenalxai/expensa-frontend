import { createQuery } from "@tanstack/solid-query"
import { createFetch } from "@utils/fetch"

export const createExpenseQuery = () => {
  const { expensesQueryKey, fetchExpenses } = createFetch()
  const query = createQuery(() => expensesQueryKey, fetchExpenses)

  return {
    query
  }
}
