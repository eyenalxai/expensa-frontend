import clsx from "clsx"

export const Loading = () => (
  <div
    class={clsx(
      "w-12",
      "h-12",
      "bg-slate-300",
      "dark:bg-slate-600",
      "rounded-full",
      "animate-ping"
    )}
  />
)
