import dayjs from "dayjs"
import { useState } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import {
	Box,
	Button,
	CssBaseline,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "../LoadingPage"
import ErrorPage from "../../pages/errorpage"
import MultipleSelect from "@/components/curriculum/MultipleSelect"
import { useStoreUser } from "../zustand"

function CreateCurriculum({ open, setOpen }) {
	const { userInfo } = useStoreUser()
	const queryClient = useQueryClient()
	const { apiRequest } = ApiServices()
	const [curName, setCurName] = useState("")
	const [selectedLessons, setSelectedLessons] = useState([])

	// Add curriculum
	const { mutate, isError, isLoading } = useMutation(
		(body) => apiRequest("POST", body, { collectionName: "curriculum" }),
		{
			onSuccess: () => queryClient.invalidateQueries(["curriculumList"]),
		}
	)

	if (isError) return <ErrorPage />
	if (isLoading) return <LoadingPage />

	return (
		<Box sx={{ width: "100%", paddingX: 2 }}>
			<CssBaseline />
			<Button
				sx={{
					mr: "10px",
					width: "100%",
					background: "rgb(95, 106, 196)",
					color: "white",
					"&:hover": { background: "#424493" },
				}}
				onClick={() => setOpen(!open)}
			>
				{open ? " Back" : "Create Curriculum"}
			</Button>
			{open && (
				<Grid
					container
					spacing={3}
					sx={{
						background: "white",
						m: "5px",
						borderRadius: 2,
						width: "98%",
					}}
				>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontWeight: "bolder", mb: 2 }}>Create your curriculum</Typography>
						<TextField
							required
							fullWidth
							id="outlined-basic"
							label="Curriculum name"
							variant="outlined"
							value={curName}
							onChange={(e) => setCurName(e.target.value)}
						/>
						<MultipleSelect selectedLessons={selectedLessons} setSelectedLessons={setSelectedLessons} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontWeight: "bolder", mb: 2 }}>Selected Lessons</Typography>
						<List
							sx={{
								p: "3px",
								mb: 1,
							}}
						>
							{selectedLessons.map((lesson) => (
								<ListItem disablePadding>
									<ListItemButton
										sx={{
											background: "rgba(186, 185, 204, 0.2)",
											mb: 1,
											borderRadius: 1,
										}}
									>
										<ListItemIcon>{lesson.lesson_number}</ListItemIcon>
										<ListItemText
											primary={lesson.topic}
											sx={{
												flex: 3,
											}}
										/>
										<ListItemText sx={{ flex: 1 }} primary={lesson.category} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Grid>
					<Button
						fullWidth
						disabled={curName.length === 0}
						sx={{ m: 3 }}
						variant="contained"
						onClick={() => (
							curName.length > 0 &&
								//@ts-ignore
								mutate({
									curriculum_name: curName,
									level: "b1",
									createdBy: {
										name: userInfo.name,
										email: userInfo.email,
										uid: userInfo.uid,
										time: dayjs(),
									},
									lessons: selectedLessons?.map((lesson) => lesson.uid) || [],
								}),
							setOpen(false)
						)}
					>
						Save
					</Button>
				</Grid>
			)}
		</Box>
	)
}

export default CreateCurriculum
