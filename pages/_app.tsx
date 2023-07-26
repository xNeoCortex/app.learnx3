import React from "react"
import type { AppProps } from "next/app"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CssBaseline } from "@mui/material"
import "@/styles/globals.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
		</QueryClientProvider>
	)
}
