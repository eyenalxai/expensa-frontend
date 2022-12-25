import clsx from "clsx"

type ErrorProps = {
  text: string
}

export const Error = (props: ErrorProps) => {
  return (
    <div class={clsx("flex", "w-full", "justify-center")}>
      <div
        class={clsx(
          "text-red-400",
          "dark:text-red-500",
          "w-fit",
          "max-w-[10rem]",
          "text-center",
          "border",
          "border-red-200",
          "dark:border-red-700",
          "rounded",
          "px-2",
          "py-1",
          "flex",
          "text-sm"
        )}
      >
        {props.text}
      </div>
    </div>
  )
}
