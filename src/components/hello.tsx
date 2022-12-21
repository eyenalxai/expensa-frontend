import { createQuery, QueryClient, QueryClientProvider } from "@tanstack/solid-query"
import { useFetch } from "../oof"
import { useAuth } from "../App"
import { createEffect, createSignal } from "solid-js"
const queryClient = new QueryClient()
function Kek() {
  const { accessToken, setAccessToken } = useAuth()
  const { fetchProfile } = useFetch(accessToken() as string, setAccessToken)
  const query = createQuery(() => ["todos"], fetchProfile)

  // createEffect(() => {
  //   setInterval(() => {
  //     const kek = fetchProfile()
  //     kek.then((user) => console.log(user.username))
  //   }, 5000)
  // })

  return <div>Hello</div>
}

export function Hello() {
  return (
    <QueryClientProvider client={queryClient}>
      <Kek />
    </QueryClientProvider>
  )
}
