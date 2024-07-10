import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Switch } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import Link from "next/link"
import DeleteComponent from "../DeleteComponent"
import { useStoreUser } from "../zustand"
import { UserType } from "@/types/types"
import { SnackbarX } from "../other/SnackbarX"
import CustomAvatar from "../elements/CustomAvatar"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiServices from "@/api/ApiServices"
import ErrorPage from "@/error"

const StudentList = React.memo(({ data }: { data: UserType[] }) => {
	const [open, setOpen] = React.useState(false)
	const { userInfo } = useStoreUser()

	return (
		<Box
			//@ts-ignore
			sx={{ marginTop: "0px" }}
		>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message="Student has been successfully deleted!"
			/>

			<TableContainer component={Paper} sx={TableContainerStyle}>
				<CssBaseline />
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							sx={{
								background: "rgb(95, 106, 196)",
								borderRadius: "12px",
								color: "white",
							}}
						>
							<TableCell sx={TableCellStyle}>Students ({data?.length})</TableCell>
							<TableCell sx={TableCellStyle}>Permission</TableCell>
							<TableCell sx={TableCellStyle}>Profile</TableCell>
							{userInfo.role == "admin" && <TableCell sx={TableCellStyle}>Delete</TableCell>}{" "}
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.length > 0 &&
							data
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((student, index) => (
									<StudentTableRow key={index} student={student} userInfo={userInfo} setOpen={setOpen} />
								))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
})

export default StudentList

const TableCellStyle = { color: "white", fontWeight: "600", fontSize: "15px" }

const TableContainerStyle = {
	margin: "10px 10px 10px 0px",
	width: "100%",
	boxShadow: "none",
	maxHeight: "600px",
}

function StudentTableRow({
	student,
	userInfo,
	setOpen,
}: {
	student: UserType
	userInfo: UserType
	setOpen: (arg: boolean) => void
}): JSX.Element {
	const { apiRequest } = ApiServices()
	const queryClient = useQueryClient()
	const [checked, setChecked] = React.useState(true)

	// update student permit
	const { mutate, isLoading, isError } = useMutation(
		(students) => apiRequest("PATCH", students, { collectionName: "students", uid: student.uid as string }),
		{
			onSuccess: () => queryClient.invalidateQueries([`students`]),
		}
	)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//@ts-ignore
		mutate({ permit: event.target.checked })
		setChecked(event.target.checked)
	}

	React.useEffect(() => {
		setChecked(student?.permit)
	}, [])

	if (isError) return <ErrorPage />

	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell
				component="th"
				scope="student"
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<CustomAvatar
					image={student?.image}
					gender={student?.gender}
					style={{ width: "35px", height: "35px", marginRight: 1.5 }}
				/>

				<p>{student.name}</p>
			</TableCell>
			<TableCell>
				<Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
			</TableCell>
			<TableCell>
				<Link href={`/student/${student.uid}`}>
					<Button
						style={{
							background: "#5f6ac4",
							color: "white",
							boxShadow: "none",
							padding: "0px",
							textTransform: "none",
						}}
					>
						View
					</Button>
				</Link>
			</TableCell>
			{userInfo.role == "admin" && (
				<TableCell>
					<DeleteComponent
						collectionName="students"
						invalidateCache="students"
						itemId={student?.uid}
						setOpen={setOpen}
					/>
				</TableCell>
			)}
		</TableRow>
	)
}
