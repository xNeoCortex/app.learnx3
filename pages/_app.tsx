import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import { BrowserRouter } from "react-router-dom"
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const [render, setRender] = useState(false)
  useEffect(() => setRender(true), [])
  return render ? (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  ) : null
}
