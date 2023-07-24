import * as React from "react"
import { useRouter } from "next/router"
import { useClassInfo, useStoreUser } from "../zustand"
import ApiServices from "@/pages/api/ApiServices"
import ApiPostServices from "@/pages/api/ApiPostServices"
import LoadingPage from "../LoadingPage"
import ErrorPage from "../ErrorPage"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import {
	Alert,
	Button,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Box,
	Dialog,
	DialogContent,
	DialogActions,
	IconButton,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"

const AddClass = React.memo<any>(({ buttonName, _class = null }) => {
	const {
		query: { id },
	} = useRouter()
	const queryClient = useQueryClient()
	const { userInfo } = useStoreUser()
	const { setClassInfo } = useClassInfo()
	const { fetchAllStudents, fetchAllTeachers, apiRequest } = ApiServices()
	const { addClass, updateClass } = ApiPostServices()
	const [open, setOpen] = React.useState(false)
	const [message, setMessage] = React.useState(false)
	const [className, setClassName] = React.useState("")
	const [videoLink, setVideoLink] = React.useState("")
	const [passcode, setPasscode] = React.useState("")
	const [curriculumX, setCurriculumX] = React.useState("")
	const [level, setLevel] = React.useState("intermediate")
	const [teachers, setTeachers] = React.useState([])
	const [students, setStudents] = React.useState([])

	// Fetch curriculum
	const {
		data: curriculum,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: ["curriculumList"],
		queryFn: () => apiRequest("GET", null, { collectionName: "curriculum" }),
		refetchOnWindowFocus: false,
	})

	// Student info
	const {
		data: fetchedStudents,
		isLoading: isLoadingStudents,
		isError: isErrorStudents,
	} = useQuery({ queryKey: ["students"], queryFn: fetchAllStudents, refetchOnWindowFocus: false })

	// Teacher info
	const { data: fetchedTeachers, isLoading: isLoadingTeachers } = useQuery({
		queryKey: ["teachers"],
		queryFn: fetchAllTeachers,
		refetchOnWindowFocus: false,
	})

	// Add class
	const { mutate, isSuccess, isError } = useMutation((body) => addClass(body), {
		onSuccess: () => queryClient.invalidateQueries(["classList"]),
	})

	//Delete Class
	const {
		mutate: deleteClass,
		isSuccess: deleteIsSuccess,
		isError: deleteIsError,
	} = useMutation((body) => apiRequest("DELETE", null, { collectionName: "classes", uid: id || _class?.uid }), {
		onSuccess: () => queryClient.invalidateQueries(["classList"]),
	})

	// Edit class
	const {
		mutate: mutatePut,
		isSuccess: isSuccessPut,
		isError: isErrorPut,
	} = useMutation({
		mutationFn: (lessonIdArray: any) =>
			apiRequest("PATCH", lessonIdArray, { collectionName: "classes", uid: _class.uid || id }),
		onSuccess: () => (queryClient.invalidateQueries(["classList"]), queryClient.invalidateQueries(["my-class"])),
	})

	const handleClickOpen = () => {
		setOpen(true)
		setMessage(false)
	}
	const handleClose = () => {
		setOpen(false)
		setMessage(false)
	}

	function handleSave() {
		if (className?.length > 0 && passcode?.length > 0) {
			if (_class) {
				//@ts-ignore
				mutatePut({
					class_name: className,
					students,
					teachers,
					curriculum_id: curriculumX,
					level: level,
					passcode: passcode?.trim(),
					video_call_link: videoLink?.trim(),
				})
			} else {
				//@ts-ignore
				mutate({
					class_name: className,
					students,
					teachers,
					curriculum_id: curriculumX,
					level: level,
					completed_lessons: [],
					passcode: passcode?.trim(),
					video_call_link: videoLink?.trim(),
				})
			}
			setClassInfo({
				class_name: className,
				students,
				teachers,
				curriculum_id: curriculumX,
				level: level,
				completed_lessons: [],
				passcode: passcode.trim() || null,
				video_call_link: videoLink.trim() || "",
			})
		}
	}

	// handle seLevel
	const handleChange = (event: React.MouseEvent<HTMLElement>, level: string) => {
		setLevel(level)
	}

	// handle teachers
	const handleTeachers = (teacher) => {
		if (teachers.includes(teacher)) {
			const newTeachersList = teachers.filter((item) => item !== teacher)
			return setTeachers(newTeachersList)
		} else {
			setTeachers((prev) => [...prev, teacher])
		}
	}

	// handle students
	const handleStudents = (student) => {
		if (students.includes(student)) {
			const newStudentsList = students.filter((item) => item !== student)
			return setStudents(newStudentsList)
		} else {
			setStudents((prev) => [...prev, student])
		}
	}

	const hnadleCurriculum = (event) => {
		setCurriculumX(event.target.value)
	}

	// Clean inputs after api requests
	React.useEffect(() => {
		if (isSuccess && !_class) {
			setClassName("")
			setPasscode("")
			setTeachers([])
			setStudents([])
			setMessage(true)
		} else if (isSuccessPut && _class) {
			setMessage(true)
			handleClose()
		}
	}, [isSuccess, isSuccessPut])

	React.useEffect(() => {
		if (_class) {
			setClassName(_class.class_name)
			setPasscode(_class.passcode)
			setTeachers(_class.teachers)
			setStudents(_class.students)
			setVideoLink(_class.video_call_link)
			setCurriculumX(_class.curriculum_id)
		}
	}, [_class])

	if (isLoadingStudents || isLoadingTeachers || cIsLoading) return <LoadingPage />
	if (isError || isErrorStudents || isErrorPut || cIsError) return <ErrorPage />

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				sx={{
					border: "1px solid rgb(95, 97, 196)",
					color: "rgb(95, 97, 196)",
					textTransform: "none",
					fontSize: 13,
					fontWeight: 600,
					padding: "2.2px 10px",
				}}
			>
				{buttonName ? buttonName : "Create class"}
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				fullWidth={true}
				maxWidth="lg"
			>
				<DialogContent dividers>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
							margin: "20px 40px",
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
							{buttonName ? buttonName : "Create class"}
						</p>
						<p>Change your account info</p>

						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: "absolute",
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<Box
								component="form"
								noValidate
								// onSubmit={handleSubmit}
								sx={{ mt: 5, width: "100%" }}
							>
								<Grid container spacing={4}>
									<Grid item sm={6}>
										<TextField
											name="firstName"
											required
											fullWidth
											id="firstName"
											label="Name"
											autoFocus
											value={className}
											onChange={(e) => setClassName(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											name="passcode"
											type="number"
											required
											fullWidth
											id="passcode"
											label="Passcode"
											value={passcode}
											onChange={(e) => setPasscode(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											name="videoLink"
											required
											fullWidth
											id="videoLink"
											label="Video Call Link"
											value={videoLink}
											onChange={(e) => setVideoLink(e.target.value)}
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FormControl fullWidth>
											<InputLabel id="demo-select-small-label">Curriculum</InputLabel>
											<Select
												labelId="demo-select-small-label"
												id="demo-select-small"
												value={curriculumX}
												label="Curriculum"
												onChange={hnadleCurriculum}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{curriculum?.data.map((lesson, key) => (
													<MenuItem key={key} value={lesson.uid}>
														{lesson.curriculum_name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12}>
										<ToggleButtonGroup
											color="primary"
											value={level}
											exclusive
											onChange={handleChange}
											aria-label="Platform"
											sx={{
												borderColor: "#e5e7eb",
												height: 56,
												mt: 2,
												width: "100%",
											}}
										>
											{["beginner", "intermediate", "advanced"].map((item, index) => (
												<ToggleButton
													key={index}
													value={item}
													style={{
														display: "flex",
														padding: "auto 30px",
														borderColor: "#e5e7eb",
														width: "100%",
													}}
												>
													{item}
												</ToggleButton>
											))}
										</ToggleButtonGroup>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												border: "1px solid #e5e7eb",
												padding: "3px",
												borderRadius: "5px",
											}}
										>
											<h4 style={{ padding: "10px" }}>Add Teacher</h4>
											{fetchedTeachers?.data.map((item, index) => (
												<Box
													key={index}
													sx={{
														m: 1,
														background: "rgb(95 106 196 / 3%)",
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
														p: 1,
														borderRadius: "5px",
													}}
												>
													<h4>{item?.name}</h4>
													<Button
														onClick={() => handleTeachers(item.uid)}
														variant="outlined"
														color={teachers?.includes(item.uid) ? "error" : "primary"}
													>
														{teachers?.includes(item.uid) ? "Remove" : "Add"}
													</Button>
												</Box>
											))}
										</Box>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												border: "1px solid #e5e7eb",
												padding: "3px",
												borderRadius: "5px",
											}}
										>
											<h4 style={{ padding: "10px" }}>Add Students</h4>
											{fetchedStudents?.data.map((item, index) => (
												<Box
													key={index}
													sx={{
														m: 1,
														background: "rgb(95 106 196 / 3%)",
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
														p: 1,
														borderRadius: "5px",
													}}
												>
													<h4>{item?.name}</h4>
													<Button
														onClick={() => handleStudents(item.uid)}
														variant="outlined"
														color={students?.includes(item.uid) ? "error" : "primary"}
													>
														{students?.includes(item.uid) ? "Remove" : "Add"}
													</Button>
												</Box>
											))}
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Box
						sx={{
							display: "flex",
							justifyContent: "right",
							width: "100%",
						}}
					>
						<Box>
							{message && (
								<Box sx={{ m: "10px 30px" }}>
									<Alert severity="success">
										{_class
											? "The class changes has been successfully saved!"
											: "The class has been successfully added!"}
									</Alert>
								</Box>
							)}
						</Box>
						{userInfo?.role == "admin" && (
							<Button
								variant="contained"
								color="error"
								onClick={() => (deleteClass(), handleClose())}
								sx={{
									m: "10px ",
									background: "rgb(255 92 92)",
								}}
							>
								Delete Class
							</Button>
						)}
						<Button
							disabled={className?.length === 0 || passcode?.length === 0}
							variant="contained"
							onClick={handleSave}
							sx={{ m: "10px " }}
						>
							{_class ? "Update Class" : "Save changes"}
						</Button>
					</Box>
				</DialogActions>
			</BootstrapDialog>
		</div>
	)
})

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

export interface DialogTitleProps {
	id: string
	children?: React.ReactNode
	onClose: () => void
}

export default AddClass
