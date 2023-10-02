import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { Alert, Typography } from "@mui/material"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import AuthLayout from "@/components/auth/AuthLayout"
import Link from "next/link"
import { auth } from "@/components/firebaseX"

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<a color="inherit" href="#">
				LearnX3
			</a>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

export default function Register() {
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [confirmPassword, setConfirmPassword] = React.useState("")
	const [message, setMessage] = React.useState("")

	// Handle register
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				sendEmailVerification(user).then(() => {
					// Email verification sent!
					setMessage(
						"Verification email sent! Please check your inbox, including your spam folder. Once verified, you can log in."
					)
				})
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				if (errorMessage.includes("email-already-in-use")) {
					setMessage("Email address already exists")
				} else {
					setMessage(errorMessage)
				}
			})
	}

	return (
		<AuthLayout>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					maxWidth: "450px",
					borderRadius: "8px",
					padding: { xs: 3, sm: 5 },
					paddingTop: "30px",
					margin: "10px",
					boxShadow: "0 2px 17px rgba(0,0,0,.08)",
					border: ".4px solid #ebeeff",
					background: "white",
				}}
			>
				<CssBaseline />
				<Typography component="h1" variant="h6" fontWeight={"bolder"} marginY="10px">
					Register 🇬🇧
				</Typography>
				<Typography align="center" marginBottom="10px">
					Practice English with AI and fellow learners!
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								value={email}
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								value={password}
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								value={confirmPassword}
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							{confirmPassword !== password && <Alert severity="error">Passwords do not match!</Alert>}
							{message && <Alert severity="success">{message}</Alert>}
						</Grid>
					</Grid>
					<Button
						disabled={!email || !password || !confirmPassword || confirmPassword !== password}
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 3,
							mb: 2,
							background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))",
							boxShadow: "none",
							" &:hover": { background: "rgba(95, 106, 196, 0.9)" },
						}}
					>
						🚀 Register
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="/auth/login">
								Already have an account? <span style={{ textDecoration: "underline", color: "#1976d2" }}>Sign in</span>
							</Link>
						</Grid>
					</Grid>
				</Box>
				<Copyright sx={{ mt: 2 }} />
			</Box>
		</AuthLayout>
	)
}
