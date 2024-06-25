"use client"
import * as React from "react"
import { deleteUser, updateProfile } from "firebase/auth"
import { updateDoc, deleteDoc, doc } from "firebase/firestore"
import {
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Alert,
	Typography,
	Input,
} from "@mui/material"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import ApiServices from "../api/ApiServices"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "../error"
import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import { useStoreUser } from "@/components/zustand"
import { auth, db, storage } from "@/components/firebaseX"
import ConfirmationModal from "@/components/other/ConfirmationModal"
import { constants } from "@/components/constants/constants"

export default function MySettings() {
	const { userInfo, setUserInfo } = useStoreUser()
	const user = auth.currentUser
	const queryClient = useQueryClient()
	const { apiRequest } = ApiServices()
	const [currentUser, setCurrentUser] = React.useState({ name: "", age: 0, gender: "", image: null })
	const [open, setOpen] = React.useState(false)
	const [message, setMessage] = React.useState({
		text: "",
		type: "",
	})
	const [openConfirmUpdate, setOpenConfirmUpdate] = React.useState(false)
	const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false)

	// Fetch user data
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
		if (fetchedUser) setCurrentUser(fetchedUser)
	}, [fetchedUser])

	// Handle input change
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, files } = event.target
		if (type === "file" && files) {
			setCurrentUser((prev) => ({
				...prev,
				[name]: files[0],
			}))
		} else {
			setCurrentUser((prev) => ({
				...prev,
				[name]: value,
			}))
		}
	}

	const handleGenderChange = (_: React.MouseEvent<HTMLElement>, newGender: string) => {
		setCurrentUser((prev) => ({
			...prev,
			gender: newGender,
		}))
	}

	// Update user data
	const updateData = async () => {
		const userDoc =
			userInfo.role === "student" ? doc(db, "students", userInfo?.uid) : doc(db, "teachers", userInfo?.uid)
		try {
			if (!currentUser.name || !currentUser.age) {
				setMessage({
					text: "Please fill in the form!",
					type: "error",
				})
				setOpen(true)
				return
			}

			if (currentUser.image && currentUser.image !== userInfo.image) {
				const imagePath =
					userInfo.role === "teacher"
						? constants.FIREBASE_STORAGE_TEACHER_IMAGE_PATH
						: constants.FIREBASE_STORAGE_STUDENT_IMAGE_PATH

				const imageRef = storageRef(storage, `${imagePath}/${`image-${userInfo.uid}`}`)
				await uploadBytes(imageRef, currentUser.image as any)
				const imageX = await getDownloadURL(imageRef)
				await updateDoc(userDoc, { ...currentUser, image: imageX, imageRef: imageRef.fullPath })
				await updateProfile(auth.currentUser as any, { displayName: currentUser.name })
				setUserInfo({ ...userInfo, ...currentUser, image: imageX, imageRef: imageRef.fullPath })
			} else {
				await updateDoc(userDoc, { ...currentUser })
				await updateProfile(auth.currentUser as any, { displayName: currentUser.name })
				setUserInfo({ ...userInfo, ...currentUser })
			}
			queryClient.invalidateQueries(["myInfo"])
			setMessage({ text: "Your information has been updated!", type: "success" })
			setOpen(true)
		} catch (e) {
			console.error(e)
			setMessage({ text: "Something went wrong", type: "error" })
			setOpen(true)
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setOpenConfirmUpdate(true)
	}

	const deleteUserAccount = async () => {
		try {
			const userDoc = doc(db, "users", userInfo?.uid)
			await deleteDoc(userDoc)
			await deleteUser(user as any)
			deleteImage()
			setMessage({ text: "Your account has been deleted", type: "success" })
			setOpen(true)
		} catch (error) {
			setMessage({ text: "Something went wrong", type: "error" })
			setOpen(true)
		}
	}

	// Delete image
	const deleteImage = async () => {
		const imageReference = userInfo.imageRef
		const imageRef = storageRef(storage, imageReference)

		try {
			await deleteObject(imageRef)
			const userDoc =
				userInfo.role === "student" ? doc(db, "students", userInfo?.uid) : doc(db, "teachers", userInfo?.uid)
			await updateDoc(userDoc, { ...currentUser, image: null, imageRef: null })
			setUserInfo({ ...userInfo, image: null })
			setCurrentUser((previewData) => ({ ...previewData, image: null }))
			setMessage({ text: "Image deleted successfully", type: "success" })
		} catch (error) {
			console.log("error :>> ", error)
			setMessage({ text: "Something went wrong deleting the image", type: "error" })
		}
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
					openConfirm={openConfirmUpdate}
					setOpenConfirm={setOpenConfirmUpdate}
					action={updateData}
					topic="Update Information"
					message="Are you sure you want to update your information?"
				/>
				<Box
					//@ts-ignore
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
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
											value={currentUser?.gender}
											exclusive
											onChange={handleGenderChange}
											aria-label="gender"
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
									<Grid item xs={12}>
										<Input
											name="image"
											type="file"
											placeholder="Upload Image"
											onChange={handleChange}
											style={{
												borderBottom: "0px ",
												background: "#f5f5f5",
												width: "100%",
												padding: "10px",
												borderRadius: "5px",
											}}
										/>
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
									onClick={deleteImage}
									sx={{
										width: "100%",
										marginBottom: "16px",
										color: "rgb(226, 109, 128)",
										border: "1px solid rgb(226, 109, 128)",
									}}
								>
									Delete My Photo
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
								{message.text && (
									<Alert severity={message.type === "success" ? "success" : "error"} sx={{ marginTop: "10px" }}>
										{message.text}
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
