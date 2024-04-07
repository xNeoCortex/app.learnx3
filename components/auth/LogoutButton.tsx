import React from "react"
import { useClerk } from "@clerk/nextjs"
import { Button } from "@mui/material"
import { useStoreUser } from "../zustand"
import { useRouter } from "next/router"

function LogoutButton({ text }: { text?: string }) {
	const { setUserInfo } = useStoreUser()
	const { signOut } = useClerk()
	const router = useRouter()

	return (
		<Button
			onClick={() => (signOut(() => router.push("/")), setUserInfo(null))}
			variant="contained"
			style={{
				background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
				width: "fit-content",
				marginTop: 10,
				padding: "auto 50px",
			}}
		>
			{text || "Login"}
		</Button>
	)
}

export default LogoutButton
