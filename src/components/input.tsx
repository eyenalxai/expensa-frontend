import clsx from "clsx"
import { JSX } from "solid-js"

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
}
export const Input = (props: InputProps) => {
  return (
    <div class={clsx("flex", "flex-col", "gap-0.5")}>
      <label class={clsx("text-slate-500", "text-xs", "ml-1")} for={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.id}
        autocomplete="on"
        class={clsx(
          "transition-style",
          "ring-style",
          "rounded-md",
          "bg-slate-200",
          "dark:bg-slate-700",
          "text-color-style",
          "px-2",
          props.class
        )}
        type={props.type}
        onChange={props.onChange}
      />
    </div>
  )
}
