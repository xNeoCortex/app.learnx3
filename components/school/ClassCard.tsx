import React from "react"
import Link from "next/link"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import AddClass from "./AddClassDialog"
import { useStoreTemporary } from "../zustand"

function ClassCard({ item }) {
	const { setClassId } = useStoreTemporary()

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
				justifyContent: "space-between",
				flexDirection: "column",
				position: "relative",
				background: "rgb(95 106 196 / 3%)",
			}}
		>
			<div>
				<h4>{item.class_name}</h4>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						margin: "10px 0px",
					}}
				>
					<p>Students: {item.students.length}</p>
					<p>Teachers: {item.teachers.length}</p>
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
