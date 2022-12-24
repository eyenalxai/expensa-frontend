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
          "w-fit",
          "max-w-[10rem]",
          "text-center",
          "bg-red-100",
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
