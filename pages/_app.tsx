import React from "react"
import type { AppProps } from "next/app"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CssBaseline } from "@mui/material"
import "@/styles/globals.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ClerkProvider, SignedOut, SignedIn, RedirectToSignIn } from "@clerk/nextjs"
import Script from "next/script"

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient())

	const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
	const analyticsCode = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

	return (
		<>
			<Script async strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${analyticsCode}`} />
			{/* Inline script for Google Analytics */}
			<Script strategy="lazyOnload">
				{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', "${analyticsCode}");
          `}
			</Script>
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
		</>
	)
}
