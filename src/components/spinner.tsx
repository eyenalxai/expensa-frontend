import clsx from "clsx"

export const Spinner = () => {
  return (
    <div
      class={clsx(
        "h-full",
        "w-full",
        "fill-color-style",
        "flex",
        "justify-center",
        "py-1",
        "animate-bounce"
      )}
    >
      ...
    </div>
  )
}
