import { Button } from "@components/button"
import { Error } from "@components/error"
import { Input } from "@components/input"
import { Spinner } from "@components/spinner"
import { createAddCategory } from "@utils/form/add-category-form"
import clsx from "clsx"
import { Show } from "solid-js"

export const AddCategory = () => {
  const {
    handleSubmitAddCategoryForm,
    categoryName,
    setCategoryName,
    isAddingCategory,
    error
  } = createAddCategory()

  return (
    <div class={clsx("flex", "flex-col", "gap-3")}>
      <form
        class={clsx("flex", "justify-center", "gap-3", "items-end")}
        onSubmit={(e) => handleSubmitAddCategoryForm(e)}
      >
        <Input
          value={categoryName()}
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
