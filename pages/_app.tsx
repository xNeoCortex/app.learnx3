import React from "react"
import type { AppProps } from "next/app"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CssBaseline } from "@mui/material"
import "@/styles/globals.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ClerkProvider, SignedOut, SignedIn, RedirectToSignIn } from "@clerk/nextjs"

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient())

	const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<Hydrate state={pageProps.dehydratedState}>
				<ClerkProvider publishableKey={clerkPubKey}>
					<SignedIn>
						<Component {...pageProps} />
					</SignedIn>
					<SignedOut>
						<RedirectToSignIn />
					</SignedOut>
				</ClerkProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
		</QueryClientProvider>
	)
}
