import { UseMutateFunction } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Dayjs } from "dayjs"
import { StorageReference } from "firebase/storage"

export interface TopicType {
	category: string
	createdAt: string
	createdById: string
	createdByName: string
	lessonId: string
	topic: string
	imagePath?: string
}

export interface LessonTimetableType {
	cancelled: boolean
	createdAt?: string
	createdById?: string
	createdByName?: string
	description: string | null
	for_everyone: boolean
	lesson_date: Dayjs | null | string
	lesson_duration_minutes: number
	lesson_target_skills: ("speaking" | "listening")[]
	lesson_type: "general_english" | "speaking_club" | "business_english" | "ielts" | "toefl"
	level: string
	passcode: string
	platform: string
	students: any[]
	teacher_id: string
	teacher_name: string
	teaching_material: string
	topic: string
	uid?: string
	video_call_link: string
}

export interface TestResultType {
	assessment_type: string
	createdAt: string
	createdById: string
	createdByName: string
	level: string
	result: number
	student_id: string
	student_name: string
	topic: string
	uid: string
}

export interface AllTestResultType {
	assessment_id: string
	lesson_number: number
	level: string
	result: number
	student_id: string
	student_name: string
	topic: string
	uid: string
}

export interface ConvertToWeeklyObjectType {
	date_from: string
	date_to: string
	lessons: LessonTimetableType[]
}

export interface UserType {
	uid: string
	name: string
	email: string
	age: number | null
	gender: string
	phone: string | null
	country: string
	role: "student" | "teacher" | "admin"
	permit: boolean
	performance: string
	eng_level_form: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
	eng_level_test: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | ""
	subscription_type: 1 | 2 | 3 | null
	paid: boolean
	subscription_start_date: string
	subscription_end_date: string
	num_of_lessons: number
	num_of_lessons_left: number
	num_of_ai_topics_created: number
	num_of_messages_with_fina_ai: number
	discount: "10%" | "20%" | "30%" | "40%" | "50%" | "60%" | "70%" | "80%" | "90%" | "100%" | ""
	image?: null | string | File
	imageRef?: string | StorageReference
	qualification?: string
	createdAt: Date
}

export type TeacherType = Pick<
	UserType,
	"name" | "age" | "phone" | "country" | "qualification" | "gender" | "email" | "uid" | "permit" | "image"
>

export interface CreateLessonDialogProps {
	handleClose: () => void
	open: boolean
	buttonName: string | undefined
	lessonInfo: LessonTimetableType
	setLessonInfo: React.Dispatch<React.SetStateAction<LessonTimetableType>>
	message: string
	_lesson: LessonTimetableType | null
	userInfo: UserType
	deleteLesson: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>
	handleSave: () => void
}
