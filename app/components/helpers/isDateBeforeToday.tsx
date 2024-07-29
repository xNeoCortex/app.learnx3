import dayjs from "dayjs"

export default function isDateBeforeToday(dateString: string | Date) {
	const inputDate = dayjs(dateString).startOf("day")
	const today = dayjs().startOf("day")

	return inputDate.isBefore(today)
}
