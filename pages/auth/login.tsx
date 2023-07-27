import * as React from "react"
import Link from "next/link"
import { getDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login"
import Typography from "@mui/material/Typography"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Alert, CircularProgress } from "@mui/material"
import AuthLayout from "@/components/auth/AuthLayout"
import { auth, db } from "@/components/firebaseX"
import { useStoreUser } from "@/components/zustand"
import LoadingPage from "@/components/LoadingPage"
import GoogleIcon from "@mui/icons-material/Google"

export default function Login() {
	const { push: navigate } = useRouter()
	const { setUserInfo } = useStoreUser()
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [error, setError] = React.useState("")
	const [isLoading, setIsLoading] = React.useState(false)

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
								return navigate("/classes")
							} else if (usersDataStudent.exists()) {
								setUserInfo(usersDataStudent.data())
								return navigate("/classes")
							} else {
								console.log(" :>> no user")
								setError("No user found")
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
					return setError("Please sign up first")
				} else if (errorMessage.includes("auth/wrong-password")) {
					return setError("Incorrect password")
				} else if (errorMessage.includes("invalid-email")) {
					return setError("Please enter a valid email")
				} else {
					return setError(errorMessage)
				}
			})
	}

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
								return navigate("/classes")
							} else if (usersDataStudent.exists()) {
								setUserInfo(usersDataStudent.data())
								return navigate("/classes")
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
					return setError("Please sign up first")
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
					background: "#5f6ac40f",
					borderRadius: "8px",
					padding: 5,
					paddingTop: "30px",
					margin: "10px",
				}}
			>
				<CssBaseline />
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LoginIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
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
						border: "1px solid black",
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
					Sign in with Google
				</Button>
				<p style={{ textAlign: "center", color: "grey", margin: 0 }}>or</p>
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
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 3,
							mb: 2,
							background: "rgb(95, 106, 196)",
							boxShadow: "none",
							" &:hover": { background: "rgba(95, 106, 196, 0.9)" },
						}}
					>
						{isLoading ? <CircularProgress /> : "Sign in with Email"}
					</Button>
					<Grid container style={{ display: "flex", justifyContent: "column" }}>
						<Grid
							item
							margin="auto"
							style={{
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
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: 10,
							}}
						>
							<Link href="/auth/register">
								Don't have an account? <span style={{ textDecoration: "underline", color: "#1976d2" }}>Sign Up</span>
							</Link>
						</Grid>
					</Grid>

					{/* <Link href="/auth/login-phone">
						<Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
							Sign In with Phone
						</Button>
					</Link> */}
				</Box>
			</Box>
		</AuthLayout>
	)
}
