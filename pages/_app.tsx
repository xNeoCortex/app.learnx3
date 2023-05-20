import React from "react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ReactQueryDevtools } from "react-query/devtools"
import "@/styles/globals.css"
import { CssBaseline } from "@mui/material"

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = React.useRef(new QueryClient())

	return (
		<QueryClientProvider client={queryClient.current}>
			<CssBaseline />
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	)
}
