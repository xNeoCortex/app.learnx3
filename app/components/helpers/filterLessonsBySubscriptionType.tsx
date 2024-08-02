import { LessonTimetableType, UserType } from "@/types/types"
import isDateBeforeToday from "./isDateBeforeToday"

export const filterLessonsBySubscriptionType = (lessons: LessonTimetableType[], userInfo: UserType) => {
	if (userInfo?.subscription_type === "pro" || userInfo?.role === "teacher" || userInfo?.role === "admin") {
		return lessons?.filter((lesson) => !isDateBeforeToday(lesson.lesson_date as string))
	}
	return lessons?.filter(
		({ lesson_date, lesson_type }) => !isDateBeforeToday(lesson_date as string) && lesson_type === "speaking_club"
	)
}
