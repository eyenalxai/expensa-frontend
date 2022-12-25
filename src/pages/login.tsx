import { Button } from "@components/button"
import { Error } from "@components/error"
import { Input } from "@components/input"
import { ErrorResponse } from "@custom-types/error"
import { AccessToken } from "@custom-types/token"
import { useAuth } from "@utils/auth-context"
import { parseError } from "@utils/error"
import { useFetch } from "@utils/fetch"
import { AxiosError, AxiosResponse } from "axios"
import clsx from "clsx"
import { createSignal, Show } from "solid-js"

export const Spinner = () => {
  return (
    <div
      class={clsx(
        "h-full",
        "w-full",
        "fill-color-style",
        "flex",
        "justify-center",
        "py-1"
      )}
    >
      <svg
        class={clsx("animate-spin")}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512"
      >
        <path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" />
      </svg>
    </div>
  )
}

export const Login = () => {
  const { setAccessToken } = useAuth()
  const { auth } = useFetch()
  const [username, setUsername] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [error, setError] = createSignal(undefined as string | undefined)
  const [isLoggingIn, setIsLoggingIn] = createSignal(false)

  return (
    <div class={clsx("mt-12", "flex", "justify-center")}>
      <form
        class={clsx("flex", "flex-col", "gap-3", "items-center")}
        onSubmit={(e) => {
          e.preventDefault()
          setError(undefined)
          setIsLoggingIn(true)
          auth(username(), password())
            .then((res: AxiosResponse<AccessToken>) => {
              if (res.status === 200) {
                setAccessToken(res.data.accessToken)
              }
            })
            .catch((r: AxiosError<ErrorResponse>) => setError(parseError(r)))
        }}
      >
        <Input
          class={clsx("input-height", "w-48")}
          id="username"
          label="username"
          type="text"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input
          id="password"
          label="password"
          type="password"
          class={clsx("input-height", "tracking-widest", "w-48")}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <div class={clsx("mt-4", "flex", "flex-col", "gap-4", "items-center")}>
          <Button class={clsx("w-16", "button-height")} type={"submit"}>
            {isLoggingIn() && error() === undefined ? <Spinner /> : "login"}
          </Button>
          <Show when={error()} keyed={true}>
            {(error) => <Error text={error} />}
          </Show>
        </div>
      </form>
    </div>
  )
}
