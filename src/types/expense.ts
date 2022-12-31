import { Category } from "@custom-types/category"

export type Expense = {
  expenseId: number
  expenseAmount: number
  expenseDate: string
  category: Category
}
