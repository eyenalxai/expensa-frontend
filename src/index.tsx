/* @refresh reload */
import { AuthProvider } from "@components/provider/auth-provider"
import { queryClient } from "@config/solid-query"
import { Router } from "@solidjs/router"
import { QueryClientProvider } from "@tanstack/solid-query"
import { render } from "solid-js/web"
import { App } from "./App"
import "./index.css"

render(() => {
  return (
    <AuthProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Router>
    </AuthProvider>
  )
}, document.getElementById("root") as HTMLElement)
