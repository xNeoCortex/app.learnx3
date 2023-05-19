import React from "react"
import Head from "next/head"
import { CssBaseline } from "@mui/material"
import SchoolPage from "./classes"

export default function Home() {
	return (
		<>
			<Head>
				<title>LearnX3</title>
				<meta name="description" content="English Language teaching platform" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CssBaseline />
			<SchoolPage />
		</>
	)
}
