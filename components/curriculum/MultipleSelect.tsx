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
import ErrorPage from "../ErrorPage"
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

export default function MultipleSelect({ selectedLessons, setSelectedLessons }) {
	const { fetchLessons } = ApiServices()

	// Fetching lessons
	const { data: fetchedLessons, isLoading, isError } = useQuery(["lessons"], fetchLessons)

	const handleChange = ({ target: { value } }) => {
		setSelectedLessons(typeof value === "string" ? value.split(",") : value)
	}

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<FormControl sx={{ mt: 3, width: "100%" }} fullWidth>
			<InputLabel id="demo-multiple-checkbox-label">Add lessons</InputLabel>
			<Select
				labelId="demo-multiple-checkbox-label"
				id="demo-multiple-checkbox"
				multiple
				value={selectedLessons}
				onChange={handleChange}
				input={<OutlinedInput label="Select lessons" />}
				renderValue={(selected) => selected.map((item) => item.topic).join(", ")}
				MenuProps={MenuProps}
			>
				{fetchedLessons?.data.map((lesson, index) => (
					<MenuItem key={index} value={lesson}>
						<Checkbox checked={selectedLessons.indexOf(lesson) > -1} />
						<ListItemText primary={lesson.topic} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
