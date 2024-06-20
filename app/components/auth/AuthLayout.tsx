import { Box } from "@mui/system"

function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box
			//@ts-ignore
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "#0e1237",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>{children}</Box>
		</Box>
	)
}

export default AuthLayout
