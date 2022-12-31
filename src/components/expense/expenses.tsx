import { Button } from "@components/button"
import { useNavigate } from "@solidjs/router"
import { createQuery } from "@tanstack/solid-query"
import { createFetch } from "@utils/fetch"
import clsx from "clsx"
import { Show } from "solid-js"

export const Expenses = () => {
  const navigate = useNavigate()
  const { expensesQueryKey, fetchExpenses } = createFetch()
  const query = createQuery(() => expensesQueryKey, fetchExpenses)

  return (
    <div class={clsx("flex", "flex-col", "items-center", "gap-3")}>
      <Button
        onClick={() => navigate("/categories")}
        class={clsx("button-height", "px-2")}
      >
        to categories
      </Button>
      <Show when={query.data} keyed={true}>
        {(expenses) => {
          if (expenses.length === 0) {
            return <div class={clsx("text-color-style")}>no expenses</div>
          }

          return <div>Hello</div>
        }}
      </Show>
    </div>
  )
}
