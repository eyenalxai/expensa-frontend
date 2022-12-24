import { Button } from "@components/button"
import { Error } from "@components/error"
import { Input } from "@components/input"
import { ErrorResponse } from "@custom-types/error"
import { AccessToken } from "@custom-types/token"
import { useAuth } from "@utils/auth/context"
import { parseError } from "@utils/error"
import { useFetch } from "@utils/fetch"
import { AxiosError, AxiosResponse } from "axios"
import clsx from "clsx"
import { createSignal, Show } from "solid-js"

export const Login = () => {
  const { setAccessToken } = useAuth()
  const { auth } = useFetch()
  const [username, setUsername] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [error, setError] = createSignal(undefined as string | undefined)

  return (
    <div class={clsx("mt-12", "flex", "justify-center")}>
      <form
        class={clsx("flex", "flex-col", "gap-3", "items-center")}
        onSubmit={(e) => {
          e.preventDefault()
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
          id="username"
          label="username"
          type="text"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input
          id="password"
          label="password"
          type="password"
          class={clsx("tracking-widest")}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button class={clsx("py-1", "px-4")} type={"submit"}>
          login
        </Button>
        <Show when={error()} keyed={true}>
          {(error) => <Error text={error} />}
        </Show>
      </form>
    </div>
  )
}
