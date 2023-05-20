import AppContainer from "@/components/AppContainer"
import { CssBaseline } from "@mui/material"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Hydrate, QueryClient, QueryClientProvider, useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()
	const [render, setRender] = useState(false)
	useEffect(() => {
		setRender(true)
	}, [])

	return render ? (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<Hydrate state={pageProps.dehydratedState}>
				<AppContainer>
					<Component {...pageProps} />
				</AppContainer>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	) : null
}
