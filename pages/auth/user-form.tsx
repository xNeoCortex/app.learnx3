import * as React from "react"
import { updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useRouter } from "next/router"
import { useStoreUser } from "@/components/zustand"
import { auth, db } from "@/components/firebaseX"
import { Alert, Divider } from "@mui/material"
import Link from "next/link"

export default function UserForm() {
	const { push: navigate, back } = useRouter()
	const [error, setError] = React.useState("")
	const [name, setName] = React.useState("")
	const [age, setAge] = React.useState(null)
	const [gender, setGender] = React.useState(null)
	const [phone, setPhone] = React.useState(null)
	const [qualification, setQualification] = React.useState("")
	const { setUserInfo } = useStoreUser()

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setGender(newAlignment)
	}

	// Add user data with specified ID, if you want with auto generated ID -> use addDoc()
	async function addUser(id: string, name: string, email: string) {
		try {
			const user = await setDoc(doc(db, "teachers", id), {
				uid: id,
				name: name,
				email: email,
				age: age,
				gender: gender,
				phone: phone,
				country: "UK",
				role: "teacher",
				permit: false,
				bio: "Experienced English teacher with a passion for helping students improve their language skills.",
				qualification: ["Teaching English as a Foreign Language (TEFL)"],
				specializations: ["Speaking", "Pronunciation"],
				reviews: [],
				photo: "",
			})

			setUserInfo({
				uid: id,
				name: name,
				email: email,
				age: age,
				gender: gender,
				phone: phone,
				country: "UK",
				role: "teacher",
				permit: false,
				bio: "Experienced English teacher with a passion for helping students improve their language skills.",
				qualification: qualification, //["Teaching English as a Foreign Language (TEFL)"],
				specializations: ["Speaking", "Pronunciation"],
				reviews: [],
				photo: "",
			})
		} catch (e) {
			console.error("Error adding document: ", e)
		}
	}

	// Handle register
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (name.length) {
			updateProfile(auth.currentUser, {
				displayName: name,
			})
				.then((user) => {
					addUser(auth.currentUser.uid, auth.currentUser.displayName, auth.currentUser.email)
					navigate("/")
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					setError("Something went wrong, please try again later")
					console.log("user-type errorCode", errorCode)
					console.log("user-type errorMessage", errorMessage)
				})
		} else {
			setError("Please enter your name")
			console.log("Please enter your name")
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", sm: "row" },
				alignItems: "center",
				justifyContent: "center",
				background: "#5f6ac40f",
				height: "100vh",
				overflow: "hidden",
				gap: "20px",
				padding: "20px",
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					maxWidth: "600px",
					borderRadius: "8px",
					width: "100%",
					padding: { xs: 3, sm: 5 },
					paddingTop: "20px",
					margin: "10px",
					overflow: "hidden",
					boxShadow: "0 2px 17px rgba(0,0,0,.08)",
					border: ".4px solid #ebeeff",
					background: "white",
				}}
			>
				<p
					style={{
						display: "flex",
						alignItems: "Start",
						fontWeight: 600,
						fontSize: 22,
						margin: "5px 0px",
					}}
				>
					Teacher Profile Details 👨‍🏫
				</p>
				<p>Enter details to set up your account </p>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 500 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								size="small"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="Full Name"
								autoFocus
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								size="small"
								type="number"
								fullWidth
								label="Age"
								value={age}
								onChange={(e) => setAge(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								size="small"
								type="number"
								fullWidth
								label="Phone Number"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size="small"
								name="qualification"
								required
								fullWidth
								id="qualification"
								label="Qualification / Certifications"
								value={qualification}
								onChange={(e) => setQualification(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<ToggleButtonGroup
								size="small"
								color="primary"
								value={gender}
								exclusive
								onChange={handleChange}
								aria-label="Platform"
								sx={{ borderColor: "#e5e7eb", height: 56, width: "100%" }}
							>
								<ToggleButton
									value="male"
									style={{
										display: "flex",
										flex: 1,
										borderColor: "#e5e7eb",
									}}
								>
									👨‍💻 Male
								</ToggleButton>
								<ToggleButton
									value="female"
									style={{
										display: "flex",
										flex: 1,
										borderColor: "#e5e7eb",
									}}
								>
									👩‍💻 Female
								</ToggleButton>
							</ToggleButtonGroup>
						</Grid>
						{error && <Alert severity="error">{error} </Alert>}
					</Grid>
					<Box sx={{ display: "flex" }}>
						<Button
							disabled={!name || !age || !qualification}
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 4, mb: 2, background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))" }}
						>
							Save
						</Button>
					</Box>
				</Box>
				<Divider sx={{ marginY: "15px", color: "black" }} />
				<Grid item xs={12} style={{ width: "100%" }}>
					<Link href={"/auth/student-form"} style={{ width: "100%" }}>
						<Button
							fullWidth
							variant="contained"
							sx={{
								width: "100%",
								mt: 1,
								mb: 1,
								background: "white",
								marginRight: "10px",
								boxShadow: "none",
								border: "0.5px solid grey",
								color: "grey",
								"&:hover": { background: "#8080802b", boxShadow: "none" },
							}}
						>
							I am a student 👩‍🎓
						</Button>
					</Link>
				</Grid>
			</Box>
		</Box>
	)
}
