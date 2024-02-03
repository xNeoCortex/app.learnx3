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
import { UserType } from "@/types/types"

type UserForm = Pick<UserType, "name" | "age" | "phone" | "country" | "eng_level_form" | "gender">

export default function StudentForm() {
	const { push: navigate } = useRouter()
	const {
		setUserInfo,
	}: {
		setUserInfo: (userInfo: UserType) => void
	} = useStoreUser()
	const [error, setError] = React.useState("")
	const [{ name, age, phone, country, eng_level_form, gender }, setUserInformation] = React.useState<UserForm>({
		name: "",
		age: null,
		phone: null,
		country: "",
		eng_level_form: "",
		gender: "",
	})
	const handleInput = (
		{ target: { value, name } }: React.ChangeEvent<HTMLInputElement>,
		option?: "eng_level_form" | "male" | "female"
	) => {
		console.log("option :>> ", option)
		setUserInformation((prev) => ({
			...prev,
			[name]: value,
			...(option && { [option]: value }),
			...((option === "male" || option === "female") && { gender: option }),
		}))
	}
	console.log({ name, age, phone, country, eng_level_form, gender })

	// Add user data with specified ID, if you want with auto generated ID -> use addDoc()
	async function addUser(id: string, name: string, email: string) {
		const currentUserInfo = {
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
			eng_level_form: eng_level_form,
			eng_level_test: "",
			subscription_type: null,
			paid: false,
			subscription_start_date: "",
			subscription_end_date: "",
			num_of_lessons: 0,
			num_of_lessons_left: 0,
			num_of_ai_topics_created: 0,
			num_of_messages_with_fina_ai: 0,
			discount: "",
			photo: "",
			createdAt: new Date(),
		}
		try {
			const user = await setDoc(doc(db, "students", id), { ...currentUserInfo })
			setUserInfo({ ...currentUserInfo } as UserType)
		} catch (e) {
			console.error("Error adding document: ", e)
		}
	}

	// Handle register
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (name.length) {
			updateProfile(auth.currentUser as any, {
				displayName: name,
			})
				.then(() => {
					if (auth.currentUser) {
						addUser(auth.currentUser.uid, auth.currentUser.displayName || "", auth.currentUser.email as string)
						navigate("/home")
					}
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
								name="name"
								required
								fullWidth
								id="firstName"
								label="Full Name"
								autoFocus
								value={name}
								onChange={handleInput}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								size="small"
								type="number"
								name="age"
								required
								fullWidth
								label="Age"
								value={age}
								onChange={handleInput}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								size="small"
								type="number"
								name="phone"
								fullWidth
								label="Phone Number"
								value={phone}
								onChange={handleInput}
							/>
						</Grid>
						<Grid item xs={12}>
							<ToggleButtonGroup
								size="small"
								color="primary"
								name="gender"
								value={gender}
								exclusive
								//@ts-ignore
								onChange={handleInput}
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
								onChange={handleInput}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth size="small">
								<InputLabel id="demo-simple-select-label">English Level</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={eng_level_form}
									label="English Level"
									name="eng_level_form"
									//@ts-ignore
									onChange={handleInput}
								>
									{engLevel.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Box sx={{ display: "flex" }}>
						<Button
							disabled={!name || !age || !eng_level_form || !country}
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

const engLevel = [
	{
		value: "A0",
		label: "Beginner",
	},
	{
		value: "A1",
		label: "Elementary",
	},
	{
		value: "A2",
		label: "Pre-Intermediate",
	},
	{
		value: "B1",
		label: "Intermediate",
	},
	{
		value: "B2",
		label: "Upper-Intermediate",
	},
	{
		value: "C1",
		label: "Advanced",
	},
	{
		value: "C2",
		label: "Proficiency",
	},
]
