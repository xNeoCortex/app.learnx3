import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import Switch from "@mui/material/Switch"
import ApiPostServices from "@/api/ApiPostServices"
import ErrorPage from "@/errorpage"
import { useMutation } from "@tanstack/react-query"
import DeleteComponent from "../DeleteComponent"
import { TeacherType } from "@/types/types"
import { SnackbarX } from "../other/SnackbarX"
import CustomAvatar from "../elements/CustomAvatar"

const TeacherList = React.memo(({ data }: { data: TeacherType[] }) => {
	const [open, setOpen] = React.useState(false)

	return (
		<Box
			// @ts-ignore
			sx={{ marginTop: "0px" }}
		>
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
})

const TableRows = React.memo(({ teacher, setOpen }: { teacher: TeacherType; setOpen: (arg: boolean) => void }) => {
	const { updateTeacherInfo } = ApiPostServices()
	const { mutate, isError } = useMutation((body: { permit: boolean }) =>
		updateTeacherInfo(body, teacher?.uid as string)
	)
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
				<CustomAvatar
					image={teacher?.image}
					gender={teacher?.gender}
					style={{ width: "35px", height: "35px", marginRight: 1.5 }}
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
})

export default TeacherList
