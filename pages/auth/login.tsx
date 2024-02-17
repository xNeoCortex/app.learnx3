import * as React from "react"
import Link from "next/link"
import { getDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Alert, CircularProgress } from "@mui/material"
import AuthLayout from "@/components/auth/AuthLayout"
import { auth, db } from "@/components/firebaseX"
import { useStoreUser } from "@/components/zustand"
import LoadingPage from "@/components/LoadingPage"

export default function Login() {
	const { push: navigate } = useRouter()
	const { setUserInfo } = useStoreUser()
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [error, setError] = React.useState("")
	const [isLoading, setIsLoading] = React.useState(false)

	// Handle login
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		signInWithEmailAndPassword(auth, email.trim(), password.trim())
			.then(async (userCredential: any) => {
				// Signed in
				const user = userCredential.user
				if (user.emailVerified) {
					try {
						if (user.displayName) {
							const docRef = doc(db, "teachers", user.uid)
							const usersData = await getDoc(docRef)

							const docRefStudent = doc(db, "students", user.uid)
							const usersDataStudent = await getDoc(docRefStudent)

							if (usersData.exists()) {
								setUserInfo(usersData.data())
								return navigate("/home/teacher")
							} else if (usersDataStudent.exists()) {
								setUserInfo(usersDataStudent.data())
								return navigate("/home")
							} else {
								console.log(" :>> no user")
								setError("No user found")
								setIsLoading(false)
							}
						} else {
							return navigate("/auth/student-form")
						}
					} catch (error) {
						console.log("error 57 :>> ", error)
						setIsLoading(false)
					}
				} else {
					setIsLoading(false)
					return setError("Please verify your email")
				}
				setIsLoading(false)
			})
			.catch((error) => {
				setIsLoading(false)
				const errorMessage = error.message
				if (errorMessage.includes("user-not-found")) {
					return setError("Please register first")
				} else if (errorMessage.includes("auth/wrong-password")) {
					return setError("Incorrect password")
				} else if (errorMessage.includes("invalid-email")) {
					return setError("Please enter a valid email")
				} else {
					return setError(errorMessage)
				}
			})
	}

	// Google login
	const provider = new GoogleAuthProvider()
	const handleSubmitGoogle = () => {
		setIsLoading(true)
		signInWithPopup(auth, provider)
			.then(async (userCredential: any) => {
				// Signed in
				const user = userCredential.user
				if (user.emailVerified) {
					try {
						if (user.displayName) {
							const docRef = doc(db, "teachers", user.uid)
							const usersData = await getDoc(docRef)

							const docRefStudent = doc(db, "students", user.uid)
							const usersDataStudent = await getDoc(docRefStudent)

							if (usersData.exists()) {
								setUserInfo(usersData.data())
								return navigate("/home/teacher")
							} else if (usersDataStudent.exists()) {
								setUserInfo(usersDataStudent.data())
								return navigate("/home")
							} else {
								setError("No user found")
								return navigate("/auth/user-type")
							}
						} else {
							return navigate("/auth/user-type")
						}
					} catch (error) {
						console.log("error 57 :>> ", error)
					}
				} else {
					return setError("Please verify your email")
				}
				setIsLoading(false)
			})
			.catch((error) => {
				setIsLoading(false)
				const errorMessage = error.message
				if (errorMessage.includes("user-not-found")) {
					return setError("Please register first")
				} else if (errorMessage.includes("auth/wrong-password")) {
					return setError("Incorrect password")
				} else if (errorMessage.includes("invalid-email")) {
					return setError("Please enter a valid email")
				} else if (errorMessage.includes("auth/popup-closed-by-user")) {
					return setError("Popup closed by user")
				} else {
					return setError(errorMessage)
				}
			})
	}

	if (isLoading)
		return (
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
				<LoadingPage />
			</Box>
		)

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
					Welcome to LearnX3 🇬🇧
				</Typography>
				<Typography align="center" marginBottom="10px">
					Practice English with AI and fellow learners!
				</Typography>

				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <Alert severity="error">{error}</Alert>}
					<Button
						disabled={!email || !password}
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
						{isLoading ? <CircularProgress /> : "🚀 Login"}
					</Button>
					<Grid container sx={{ display: "flex", justifyContent: "column" }}>
						<Grid
							item
							margin="auto"
							sx={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Link href="/auth/forgot-password">
								<span style={{ textDecoration: "underline", color: "#1976d2" }}>Forgot password?</span>
							</Link>
						</Grid>
						<Grid
							item
							margin="auto"
							sx={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: "10px",
							}}
						>
							<Link href="/auth/register">
								Don't have an account? <span style={{ textDecoration: "underline", color: "#1976d2" }}>Register</span>
							</Link>
						</Grid>
					</Grid>
				</Box>
				<Typography style={{ textAlign: "center", color: "grey", margin: 0 }}>or</Typography>
				<Button
					onClick={handleSubmitGoogle}
					fullWidth
					variant="contained"
					sx={{
						mt: 3,
						mb: 2,
						boxShadow: "none",
						background: "white",
						color: "black",
						border: "0.5px solid grey",
						" &:hover": { background: "white" },
					}}
				>
					<Avatar
						alt="Google"
						src="/google.svg"
						sx={{
							width: "24px",
							height: "24px",
							m: 1,
						}}
					/>{" "}
					Log in with Google
				</Button>
			</Box>
		</AuthLayout>
	)
}
