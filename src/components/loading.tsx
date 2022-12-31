import clsx from "clsx"

export const Loading = () => {
  return (
    <div
      class={clsx(
        "h-full",
        "w-full",
        "fill-color-style",
        "flex",
        "text-color-style",
        "justify-center",
        "py-1",
        "animate-bounce"
      )}
    >
      ...
    </div>
  )
}
