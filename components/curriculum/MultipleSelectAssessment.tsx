import * as React from "react"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import ListItemText from "@mui/material/ListItemText"
import Select from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import ErrorPage from "../../pages/errorpage"
import { Box, Typography } from "@mui/material"
import LoadingPage from "../LoadingPage"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

export default function MultipleSelectAssessment({ selectedLessons, setSelectedLessons, assessmentType }) {
	const { fetchAssessment } = ApiServices()

	// Fetching lessons
	const { data, isLoading, isError } = useQuery([assessmentType], () => fetchAssessment(assessmentType))

	const handleChange = ({ target: { value } }) => {
		setSelectedLessons(typeof value === "string" ? value.split(",") : value)
	}

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<FormControl sx={{ mt: 3, width: "100%" }} fullWidth>
			<InputLabel id="demo-multiple-checkbox-label">Add assessment</InputLabel>
			<Select
				labelId="demo-multiple-checkbox-label"
				id="demo-multiple-checkbox"
				multiple
				value={selectedLessons}
				onChange={handleChange}
				input={<OutlinedInput label="Select assessment" />}
				renderValue={(selected) => selected.map((item) => item.topic).join(", ")}
				MenuProps={MenuProps}
			>
				{data?.data?.length > 0 &&
					data?.data
						?.sort((a, b) => {
							if (a.lesson_number > b.lesson_number) return 1
							if (a.lesson_number < b.lesson_number) return -1
							return 0
						})
						.map((lesson, index) => (
							<MenuItem key={index} value={lesson}>
								<Checkbox checked={selectedLessons.indexOf(lesson) > -1} />
								<ListItemText
									primary={
										<Box sx={{ display: "flex" }}>
											<Typography sx={{ flex: 1, mr: 2 }}>Lesson {lesson.lesson_number} </Typography>
											<Typography sx={{ flex: 2 }}>{lesson.topic}</Typography>
										</Box>
									}
								/>
							</MenuItem>
						))}
			</Select>
		</FormControl>
	)
}
