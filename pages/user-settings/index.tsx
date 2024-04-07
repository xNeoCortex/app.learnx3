import * as React from "react"
import { deleteUser } from "firebase/auth"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { updateDoc, deleteDoc, doc } from "firebase/firestore"
import { sendPasswordResetEmail } from "firebase/auth"
import { Alert, Typography } from "@mui/material"
import { updateProfile } from "firebase/auth"
import { useStoreUser } from "../../components/zustand"
import { auth, db } from "../../components/firebaseX"
import ConfirmationModal from "@/components/other/ConfirmationModal"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import ApiServices from "../api/ApiServices"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "../error"
import { SnackbarX } from "@/components/other/SnackbarX"

export default function MySettings() {
	const { userInfo } = useStoreUser((state) => state)
	const user = auth.currentUser // Current user
	const queryClient = useQueryClient()
	const { apiRequest } = ApiServices()
	const [currentUser, setCurrentUser] = React.useState({
		name: "",
		age: 0,
		gender: "",
	})
	const [email, setEmail] = React.useState(userInfo?.email || "")
	const [emailMessage, setEmailMessage] = React.useState("")
	const [open, setOpen] = React.useState(false)
	const [message, setMessage] = React.useState("")
	const [openConfirmUpdate, setOpenConfirmUpdate] = React.useState(false)
	const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false)
	const [openConfirmPassword, setOpenConfirmPassword] = React.useState(false)

	// Fetching lessons
	const { data, isLoading, isError } = useQuery({
		queryKey: ["myInfo"],
		queryFn: () =>
			apiRequest("GET", null, {
				collectionName: userInfo.role === "student" ? "students" : "teachers",
				uid: userInfo?.uid,
			}),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const fetchedUser = data?.data

	React.useEffect(() => {
		setCurrentUser(fetchedUser)
	}, [data, isLoading])

	// Reset Password
	function resetPassword() {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				setEmailMessage("Password reset email sent! Please follow the link on your email to reset your password.")
			})
			.catch((error) => {
				setEmailMessage("Something went wrong!")
				console.log("error.message :>> ", error.message)
			})
	}

	const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>, option?: string) => {
		setCurrentUser((prev) => ({
			...prev,
			[name]: value,
			...(option && { [option]: value }),
			...((option === "male" || option === "female") && { gender: option }),
		}))
	}

	async function updateData() {
		const userDoc =
			userInfo.role === "student" ? doc(db, "students", userInfo?.uid) : doc(db, "teachers", userInfo?.uid)
		try {
			if (!currentUser) return setMessage("Please fill in the form!")
			await updateDoc(userDoc, currentUser as any)
			await updateProfile(auth.currentUser as any, {
				displayName: currentUser?.name || "",
			})
			queryClient.invalidateQueries(["myInfo"])
			setOpen(true)
			setMessage("Your information has been updated!")
		} catch (e) {
			setMessage("Something went wrong")
			setOpen(true)
		}
	}

	async function deleteUserAccount() {
		try {
			const userDoc = doc(db, "users", userInfo?.uid)
			await deleteDoc(userDoc)
			await deleteUser(user as any)
			setMessage("Your account has been deleted")
			setOpen(true)
		} catch (error) {
			setMessage("Something went wrong")
			setOpen(true)
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		updateData()
	}

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<CssBaseline />
				<ConfirmationModal
					openConfirm={openConfirmDelete}
					setOpenConfirm={setOpenConfirmDelete}
					action={deleteUserAccount}
					topic="Delete"
					message="Are you sure you want to delete your account?"
				/>
				<ConfirmationModal
					openConfirm={openConfirmPassword}
					setOpenConfirm={setOpenConfirmPassword}
					action={resetPassword}
					topic="Reset Password"
					message="Are you sure you want to reset your password?"
				/>
				<ConfirmationModal
					openConfirm={openConfirmUpdate}
					setOpenConfirm={setOpenConfirmUpdate}
					action={updateData}
					topic="Update Information"
					message="Are you sure you want to update your information?"
				/>
				<SnackbarX open={open} setOpen={setOpen} backgroundColor="#32a676" message={message} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "start",
						margin: { xs: "10px", sm: "20px 40px" },
					}}
				>
					<Typography
						sx={{
							display: "flex",
							alignItems: "center",
							fontWeight: "600",
							fontSize: "22px",
							margin: "10px 0px",
						}}
					>
						Profile details
					</Typography>
					<p>Change your account info</p>

					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} component="form" noValidate onSubmit={handleSubmit}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-around",
									mt: 2,
									background: "#5f6ac40f",
									borderRadius: "8px",
									padding: 5,
								}}
							>
								<Grid container spacing={4}>
									<Grid item xs={12}>
										<TextField
											name="name"
											required
											fullWidth
											id="firstName"
											label="Name"
											autoFocus
											value={currentUser?.name}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											type="number"
											fullWidth
											label="Age"
											name="age"
											value={currentUser?.age}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={6}>
										<ToggleButtonGroup
											size="small"
											color="primary"
											name="gender"
											value={currentUser?.gender}
											exclusive
											//@ts-ignore
											onChange={handleChange}
											aria-label="Platform"
											sx={{ borderColor: "#e5e7eb", height: "56px", width: "100%" }}
										>
											<ToggleButton
												value="male"
												sx={{
													display: "flex",
													flex: 1,
													borderColor: "#e5e7eb",
												}}
											>
												👨‍💻 Male
											</ToggleButton>
											<ToggleButton
												value="female"
												sx={{
													display: "flex",
													flex: 1,
													borderColor: "#e5e7eb",
												}}
											>
												👩‍💻 Female
											</ToggleButton>
										</ToggleButtonGroup>
									</Grid>
								</Grid>
								<Button
									onClick={() => setOpenConfirmUpdate(true)}
									fullWidth
									variant="contained"
									sx={{ mt: 8, mb: 2, background: "rgb(226, 109, 128)" }}
								>
									Update
								</Button>
								<Button
									onClick={() => setOpenConfirmDelete(true)}
									sx={{
										width: "100%",
										marginBottom: "16px",
										color: "rgb(226, 109, 128)",
										border: "1px solid rgb(226, 109, 128)",
									}}
								>
									Delete My Profile
								</Button>
								{emailMessage && (
									<Alert severity="success" sx={{ marginTop: "10px" }}>
										{emailMessage}
									</Alert>
								)}
							</Box>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "space-around" }}>
								<img src="/business-account.png" style={{ width: 400 }} alt="profile" />
							</Box>
						</Grid>
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}
