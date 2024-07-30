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
import { useStoreUser } from "../zustand"
import { UserType } from "@/types/types"
import { SnackbarX } from "../other/SnackbarX"
import StudentTableRow from "./StudentTableRow"

const StudentList = React.memo(({ data }: { data: UserType[] }) => {
	const [open, setOpen] = React.useState(false)
	const { userInfo } = useStoreUser()

	const studentList = React.useMemo(() => {
		if (!data || data.length === 0) return []

		return data.sort((a, b) => {
			const dateA = a?.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(String(a?.createdAt)).getTime()
			const dateB = b?.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(String(b?.createdAt)).getTime()

			return dateB - dateA
		})
	}, [data])

	return (
		<Box
			//@ts-ignore
			sx={{ marginTop: "0px", width: "100%" }}
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
							<TableCell sx={TableCellStyle}>Date Joined </TableCell>
							<TableCell sx={TableCellStyle}>Students ({data?.length})</TableCell>
							<TableCell sx={TableCellStyle}>Email</TableCell>
							<TableCell sx={TableCellStyle}>Subscription Type</TableCell>
							<TableCell sx={TableCellStyle}>Permission</TableCell>
							<TableCell sx={TableCellStyle}>Paid</TableCell>
							<TableCell sx={TableCellStyle}>Profile</TableCell>
							{userInfo.role == "admin" && <TableCell sx={TableCellStyle}>Delete</TableCell>}{" "}
						</TableRow>
					</TableHead>
					<TableBody>
						{studentList?.length > 0 &&
							studentList?.map((student, index) => (
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
	margin: "8px",
	width: "100%",
	boxShadow: "none",
}
