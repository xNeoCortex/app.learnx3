import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Avatar, Button } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import Switch from "@mui/material/Switch"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../ErrorPage"
import { useMutation } from "@tanstack/react-query"
import SnackbarX from "../other/SnackbarX"
import DeleteComponent from "../DeleteComponent"

export default function TeacherList({ data }) {
	const [open, setOpen] = React.useState(false)

	return (
		<Box sx={{ marginTop: "0px" }}>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message="Teacher has been successfully deleted!"
			/>
			<TableContainer
				component={Paper}
				style={{
					margin: "10px",
					width: "calc(100%)",
					boxShadow: "none",
					maxHeight: "600px",
				}}
			>
				<CssBaseline />
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							style={{
								background: "rgb(95, 106, 196)",
								borderRadius: 12,
								color: "white",
							}}
						>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>
								Teachers ({data?.length}){" "}
							</TableCell>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Email</TableCell>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Permission</TableCell>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.length > 0 &&
							data
								?.sort((a, b) => {
									if (a.name > b.name) return 1
									if (a.name < b.name) return -1
									return 0
								})
								?.map((teacher, index) => <TableRows key={index} teacher={teacher} setOpen={setOpen} />)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

function TableRows({ teacher, setOpen }) {
	const { updateTeacherInfo } = ApiPostServices()
	const { mutate, isError } = useMutation((body) => updateTeacherInfo(body, teacher.uid))
	const [checked, setChecked] = React.useState(true)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//@ts-ignore
		mutate({ permit: event.target.checked })
		setChecked(event.target.checked)
	}

	React.useEffect(() => {
		setChecked(teacher?.permit)
	}, [])

	if (isError) return <ErrorPage />

	return (
		<TableRow key={teacher.uid} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell
				component="th"
				scope="row"
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Avatar
					src="/pupil-avatar.png"
					sx={{
						width: 35,
						height: 35,
						border: "2px solid rgb(95, 106, 196)",
						marginRight: 1.5,
					}}
				/>
				<p>{teacher.name}</p>
			</TableCell>
			<TableCell>{teacher.email}</TableCell>
			<TableCell>
				<Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
			</TableCell>
			<TableCell>
				<DeleteComponent collectionName="teachers" invalidateCache="teachers" itemId={teacher?.uid} setOpen={setOpen} />
			</TableCell>
		</TableRow>
	)
}
