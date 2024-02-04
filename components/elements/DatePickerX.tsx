import * as React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import localTime from "../helpers/localTime"
import { LessonTimetableType } from "@/types/types"
import { Dayjs } from "dayjs"
const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

export default function DatePickerX({
	calendarValue,
	setCalendarValue,
}: {
	calendarValue: Dayjs | null | string
	setCalendarValue: React.Dispatch<React.SetStateAction<LessonTimetableType>>
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DateTimePicker
				sx={{ width: "100%" }}
				label="Controlled picker"
				value={localTime(calendarValue) || null}
				onChange={(newValue) => setCalendarValue((prev) => ({ ...prev, lesson_date: newValue }))}
			/>
		</LocalizationProvider>
	)
}
