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

export default function UserForm() {
	const { push: navigate, back } = useRouter()
	const [name, setName] = React.useState("")
	const [age, setAge] = React.useState(null)
	const [gender, setGender] = React.useState(null)
	const [phone, setPhone] = React.useState(null)
	const [university, setUniversity] = React.useState(null)
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
				university: university,
				country: "UK",
				role: "teacher",
				permit: false,
			})

			setUserInfo({
				uid: id,
				name: name,
				email: email,
				age: age,
				gender: gender,
				phone: phone,
				university: university,
				country: "UK",
				role: "teacher",
				permit: false,
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
					console.log(errorCode, errorMessage)
					// ..
				})
		} else {
			console.log("Please enter a name")
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				margin: "20px 40px",
				padding: "50px",
				background: "white",
				height: "100vh",
				overflow: "hidden",
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					maxWidth: "650px",
					background: "#5f6ac40f",
					borderRadius: "8px",
					padding: 5,
					paddingTop: "20px",
					margin: "10px",
					overflow: "hidden",
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
					Teacher Profile Details
				</p>
				<p>Enter details to set up your account </p>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 500 }}>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<TextField
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
							<TextField type="number" fullWidth label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								type="number"
								fullWidth
								label="Phone Number"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="university"
								required
								fullWidth
								id="university"
								label="University / Company"
								value={university}
								onChange={(e) => setUniversity(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<ToggleButtonGroup
								color="primary"
								value={gender}
								exclusive
								onChange={handleChange}
								aria-label="Platform"
								style={{ borderColor: "#e5e7eb", height: 56 }}
							>
								<ToggleButton
									value="male"
									style={{
										display: "flex",
										flex: 1,
										width: 250,
										borderColor: "#e5e7eb",
									}}
								>
									Male
								</ToggleButton>
								<ToggleButton
									value="female"
									style={{
										display: "flex",
										flex: 1,
										width: 250,
										borderColor: "#e5e7eb",
									}}
								>
									Female
								</ToggleButton>
							</ToggleButtonGroup>
						</Grid>
					</Grid>
					<Box sx={{ display: "flex" }}>
						<Button
							onClick={() => back()}
							fullWidth
							variant="contained"
							sx={{
								mt: 4,
								mb: 2,
								background: "white",
								color: "black",
								marginRight: "10px",
							}}
						>
							Back
						</Button>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2, background: "rgb(226, 109, 128)" }}>
							Next
						</Button>
					</Box>
				</Box>
			</Box>
			<img src="/business-account.png" style={{ width: 450 }} alt="profile" />
		</Box>
	)
}
