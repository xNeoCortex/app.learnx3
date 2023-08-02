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
import { Alert } from "@mui/material"
import { updateProfile } from "firebase/auth"
import { useStoreUser } from "../components/zustand"
import { auth, db } from "../components/firebaseX"
import ConfirmationModal from "@/components/other/ConfirmationModal"
import SnackbarX from "@/components/other/SnackbarX"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import ApiServices from "./api/ApiServices"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "./error"

export default function MySettings() {
	const { userInfo, setUserInfo } = useStoreUser((state) => state)
	const [currentUser, setCurrentUser] = React.useState(null)
	const [email, setEmail] = React.useState(userInfo?.email || "")
	const [emailMessage, setEmailMessage] = React.useState("")
	const user = auth.currentUser // Current user
	const queryClient = useQueryClient()
	const { apiRequest } = ApiServices()

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

	//Snackbar
	const [open, setOpen] = React.useState(false)
	const [message, setMessage] = React.useState("")

	// OnMount set user information
	React.useEffect(() => {
		setCurrentUser(fetchedUser)
	}, [data, isLoading])

	// Reset Password
	const [openConfirmPassword, setOpenConfirmPassword] = React.useState(false)
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

	// set gender
	const handleChange = (event: React.MouseEvent<HTMLElement>, gender: string) => {
		setCurrentUser({ ...currentUser, gender: gender })
	}

	// Update user data
	const [openConfirmUpdate, setOpenConfirmUpdate] = React.useState(false)
	async function updateData() {
		const userDoc =
			userInfo.role === "student" ? doc(db, "students", userInfo?.uid) : doc(db, "teachers", userInfo?.uid)
		try {
			const user = await updateDoc(userDoc, currentUser)
			const userAuth = await updateProfile(auth.currentUser, {
				displayName: currentUser.name,
			})
			queryClient.invalidateQueries(["myInfo"])
			setOpen(true)
			setMessage("Your information has been updated!")
		} catch (e) {
			setMessage("Something went wrong")
			setOpen(true)
		}
	}

	// Delete user data
	const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false)
	async function deleteUserAccount() {
		const userDoc = doc(db, "users", userInfo?.uid)
		await deleteDoc(userDoc)

		deleteUser(user)
			.then(() => {
				setMessage("Your account has been deleted")
				setOpen(true)
			})
			.catch((error) => {
				setMessage("Something went wrong")
				setOpen(true)
			})
	}

	// Handle Submit button
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
					<p
						style={{
							display: "flex",
							alignItems: "center",
							fontWeight: 600,
							fontSize: 22,
							margin: "10px 0px",
						}}
					>
						Profile details
					</p>
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
											name="firstName"
											required
											fullWidth
											id="firstName"
											label="Name"
											autoFocus
											value={currentUser?.name}
											onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											type="number"
											fullWidth
											label="Age"
											value={currentUser?.age}
											onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })}
										/>
									</Grid>
									<Grid item xs={6}>
										<ToggleButtonGroup
											color="primary"
											value={currentUser?.gender || "male"}
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
													width: 117,
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
													width: 117,
													borderColor: "#e5e7eb",
												}}
											>
												Female
											</ToggleButton>
										</ToggleButtonGroup>
									</Grid>
								</Grid>
								<Button
									onClick={() => setOpenConfirmUpdate(true)}
									// type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 8, mb: 2, background: "rgb(226, 109, 128)" }}
								>
									Update
								</Button>
								<Button
									onClick={() => setOpenConfirmDelete(true)}
									style={{
										width: "100%",
										marginBottom: "16px",
										color: "rgb(226, 109, 128)",
										border: "1px solid rgb(226, 109, 128)",
									}}
								>
									Delete My Profile
								</Button>
								<Button
									onClick={() => setOpenConfirmPassword(true)}
									style={{
										width: "100%",
										color: "#1976d2",
										border: "1px solid #1976d2",
										marginRight: "10px",
									}}
								>
									Change Login Password
								</Button>
								{emailMessage && (
									<Alert severity="success" style={{ marginTop: 10 }}>
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
