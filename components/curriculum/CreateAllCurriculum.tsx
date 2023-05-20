import { Box } from "@mui/material"
import React, { useState } from "react"
import { useStoreUser } from "../zustand"
import CreateAssessment from "./CreateAssessment"
import CreateCurriculum from "./CreateCurriculum"
import CreateLesson from "./CreateLesson"

interface PropOpen {
	open?: boolean
	openLesson?: boolean
	openTest?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	setOpenLesson?: React.Dispatch<React.SetStateAction<boolean>>
	setOpenTest?: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateAllCurriculum({ open, openLesson, openTest, setOpen, setOpenLesson, setOpenTest }: PropOpen) {
	const { userInfo } = useStoreUser()

	if (userInfo?.role === "teacher" || userInfo?.role === "admin") {
		return (
			<Box sx={{ display: "flex", mb: 3, mt: 3 }}>
				{!openLesson && !openTest && <CreateCurriculum open={open} setOpen={setOpen} />}
				{!open && !openTest && <CreateLesson open={openLesson} setOpen={setOpenLesson} />}
				{!open && !openLesson && <CreateAssessment open={openTest} setOpen={setOpenTest} />}
			</Box>
		)
	}
}

export default CreateAllCurriculum
