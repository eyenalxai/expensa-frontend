import { Button } from "@components/button"
import { Error } from "@components/error"
import { Input } from "@components/input"
import { Spinner } from "@components/spinner"
import { createLogin } from "@utils/form/login-form"
import clsx from "clsx"
import { Show } from "solid-js"

export const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoggingIn,
    handleSubmitLoginForm
  } = createLogin()

  return (
    <div class={clsx("mt-12", "flex", "justify-center")}>
      <form
        class={clsx("flex", "flex-col", "gap-3", "items-center")}
        onSubmit={(e) => handleSubmitLoginForm(e)}
      >
        <Input
          value={username()}
          class={clsx("input-height", "w-48")}
          id="username"
          label="username"
          type="text"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input
          value={password()}
          id="password"
          label="password"
          type="password"
          class={clsx("input-height", "tracking-widest", "w-48")}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <div class={clsx("mt-4", "flex", "flex-col", "gap-4", "items-center")}>
          <Button class={clsx("button-height", "px-2")} type={"submit"}>
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
