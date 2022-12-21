import { createSignal } from "solid-js"
import { axiosInstance } from "../config/axios"
import { AxiosResponse } from "axios"
import { AccessToken } from "../type/token"
import { useAuth } from "../App"

type LoginProps = {
  setAccessToken: (accessToken: string | null) => void
}

export const Login = () => {
  const { setAccessToken } = useAuth()

  const [username, setUsername] = createSignal("")
  const [password, setPassword] = createSignal("")
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("username", username())
    formData.append("password", password())

    axiosInstance
      .post("/auth", formData, { withCredentials: true })
      .then((res: AxiosResponse<AccessToken>) => {
        if (res.status === 200) {
          setAccessToken(res.data.accessToken)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onInput={(e) => setUsername(e.currentTarget.value)} />
      <input type="password" onInput={(e) => setPassword(e.currentTarget.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
