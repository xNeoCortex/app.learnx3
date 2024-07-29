import { ConvertToWeeklyObjectType, LessonTimetableType } from "@/types/types"
import dayjs from "dayjs"

function getWeekRange(date: string | Date) {
	const currentDate = dayjs(date)
	const dayOfWeek = currentDate.day()
	const diff = currentDate.date() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Adjust for Sunday
	const startOfWeek = currentDate.date(diff)
	const endOfWeek = currentDate.date(diff + 6)
	return { start: startOfWeek.format("YYYY-MM-DD"), end: endOfWeek.format("YYYY-MM-DD") }
}

export default function groupLessonsByWeek(lessons: LessonTimetableType[]): ConvertToWeeklyObjectType[] {
	const weeklyData: any = {}

	lessons?.forEach((lesson) => {
		const lessonDate = new Date(lesson.lesson_date as string)
		const weekRange: {
			start: string
			end: string
		} = getWeekRange(lessonDate)

		if (!weeklyData[weekRange.start]) {
			weeklyData[weekRange.start] = {
				date_from: weekRange.start,
				date_to: weekRange.end,
				lessons: [],
			}
		}

		weeklyData[weekRange.start].lessons.push(lesson)
	})

	return Object.values(weeklyData)
}
