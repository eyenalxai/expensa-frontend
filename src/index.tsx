/* @refresh reload */
import { AuthProvider } from "@components/auth-provider"
import { Router } from "@solidjs/router"
import { QueryClientProvider } from "@tanstack/solid-query"
import { queryClient } from "@utils/query"
import { render } from "solid-js/web"
import { App } from "./App"
import "./index.css"

render(
  () => (
    <AuthProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Router>
    </AuthProvider>
  ),
  document.getElementById("root") as HTMLElement
)
