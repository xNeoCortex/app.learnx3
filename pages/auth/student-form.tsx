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
import { Alert, Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Link from "next/link"

export default function StudentForm() {
	const { push: navigate, back } = useRouter()
	const [error, setError] = React.useState("")
	const [name, setName] = React.useState("")
	const [age, setAge] = React.useState(null)
	const [gender, setGender] = React.useState(null)
	const [phone, setPhone] = React.useState(null)
	const [country, setCountry] = React.useState(null)
	const [engLevel, setEngLevel] = React.useState("")
	const { setUserInfo } = useStoreUser()

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setGender(newAlignment)
	}

	// Add user data with specified ID, if you want with auto generated ID -> use addDoc()
	async function addUser(id: string, name: string, email: string) {
		try {
			const user = await setDoc(doc(db, "students", id), {
				uid: id,
				name: name,
				email: email,
				age: age,
				gender: gender,
				phone: phone,
				country: country,
				role: "student",
				permit: true,
				performance: "Doing ok",
				eng_level_form: engLevel, // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = proficiency
				eng_level_test: "", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = proficiency
				subscription_type: null, // free = 1, premium = 2, charity = 3
				paid: false,
				subscription_start_date: "",
				subscription_end_date: "",
				num_of_lessons: 0,
				num_of_lessons_left: 0,
				num_of_ai_topics_created: 0,
				num_of_messages_with_fina_ai: 0,
				discount: "", // 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%
				photo: "",
			})

			setUserInfo({
				uid: id,
				name: name,
				email: email,
				age: age,
				gender: gender,
				phone: phone,
				country: country,
				role: "student",
				permit: true,
				performance: "Doing ok",
				eng_level_form: "", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = proficiency
				eng_level_test: "", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = proficiency
				subscription_type: null, // free = 1, premium = 2, charity = 3
				paid: false,
				subscription_start_date: "",
				subscription_end_date: "",
				num_of_lessons: 0,
				num_of_lessons_left: 0,
				num_of_ai_topics_created: 0,
				num_of_messages_with_fina_ai: 0,
				discount: "", // 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%
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
					navigate("/home")
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
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundImage: `url(/bg1.jpg)`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
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
					🚀 Student Profile Details
				</p>
				<p>Enter details to set up your account</p>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={4}>
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
								required
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
							<ToggleButtonGroup
								size="small"
								color="primary"
								value={gender}
								exclusive
								onChange={handleChange}
								aria-label="Platform"
								style={{ borderColor: "#e5e7eb", height: 56, width: "100%" }}
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
						<Grid item xs={12}>
							<TextField
								size="small"
								name="country"
								required
								fullWidth
								id="country"
								label="Country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth size="small">
								<InputLabel id="demo-simple-select-label">English Level</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={engLevel}
									label="English Level"
									onChange={(e) => setEngLevel(e.target.value)}
								>
									<MenuItem value={"A0"}>Beginner</MenuItem>
									<MenuItem value={"A1"}>Elementary</MenuItem>
									<MenuItem value={"A2"}>Pre-Intermediate</MenuItem>
									<MenuItem value={"B1"}>Intermediate</MenuItem>
									<MenuItem value={"B2"}>Upper-Intermediate</MenuItem>
									<MenuItem value={"C1"}>Advanced</MenuItem>
									<MenuItem value={"C2"}>Proficiency</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Box sx={{ display: "flex" }}>
						<Button
							disabled={!name || !age || !engLevel || !country}
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 4, mb: 2, background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))" }}
						>
							🏁 Save
						</Button>
					</Box>
					<Grid item xs={12}>
						{error && <Alert severity="error">{error} </Alert>}
					</Grid>
					<Divider sx={{ marginY: "15px" }} />
					<Grid item xs={12}>
						<Link href={"/auth/user-form"}>
							<Button
								fullWidth
								variant="contained"
								sx={{
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
								I am a teacher 🧑‍🏫
							</Button>
						</Link>
					</Grid>
				</Box>
			</Box>
		</Box>
	)
}
