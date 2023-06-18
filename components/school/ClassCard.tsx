import React from "react"
import Link from "next/link"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import AddClass from "./AddClassDialog"
import { useStoreTemporary } from "../zustand"
import DeleteComponent from "../helpers/DeleteComponent"
import SnackbarX from "../other/SnackbarX"

function ClassCard({ item, studentList, teacherList }) {
	const { setClassId } = useStoreTemporary()
	const [open, setOpen] = React.useState(false)

	return (
		<Box
			key={item.id}
			style={{
				boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
				padding: "10px 20px",
				flex: 2,
				minWidth: "320px",
				maxWidth: "320px",
				margin: "10px",
				marginTop: "15px",
				borderRadius: "8px",
				maxHeight: "250px",
				display: "flex",
				color: "rgb(50, 50, 93)",
				justifyContent: "space-between",
				flexDirection: "column",
				position: "relative",
				background: "rgb(95 106 196 / 3%)",
			}}
		>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message={`The Class ${item.class_name} has been successfully deleted!`}
			/>
			<div>
				<h4>{item.class_name}</h4>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						margin: "10px 0px",
					}}
				>
					<p>
						Students:{" "}
						{item.students.filter((item) => studentList?.data?.filter((student) => student.id === item))?.length ||
							"N/A"}
					</p>
					<p>
						Teachers:{" "}
						{item.teachers.filter((item) => teacherList?.data?.filter((student) => student.id === item))?.length ||
							"N/A"}
					</p>
				</Box>
				<p>Curriculum: {item.curriculum_topic}</p>
				<p>Class level: {item.level}</p>
				<p>Passcode: {item.passcode}</p>
			</div>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					m: "20px auto 5px",
				}}
			>
				<AddClass _class={item} buttonName="Edit class" />
				<DeleteComponent collectionName="classes" invalidateCache="listClasses" itemId={item.uid} setOpen={setOpen} />
				<Link href={`classes/[id]`} as={`classes/${item.uid}`}>
					<Button variant="contained" onClick={() => setClassId(item.uid)}>
						View
					</Button>
				</Link>
			</Box>
		</Box>
	)
}

export default ClassCard
