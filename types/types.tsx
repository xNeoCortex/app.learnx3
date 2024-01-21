export interface topicType {
	category: string
	createdAt: string
	createdById: string
	createdByName: string
	lessonId: string
	topic: string
}

export interface lessonTimetableType {
	cancelled: boolean
	createdAt: string
	createdById: string
	createdByName: string
	description: string | null
	for_everyone: boolean
	lesson_date: string
	lesson_duration_minutes: number
	lesson_target_skills: ("speaking" | "listening")[]
	lesson_type: string
	level: string
	passcode: string
	platform: string
	students: any[]
	teacher_id: string
	teacher_name: string
	teaching_material: string
	topic: string
	uid: string
	video_call_link: string
}

export interface testResultType {
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

export interface allTestResultType {
	assessment_id: string
	lesson_number: number
	level: string
	result: number
	student_id: string
	student_name: string
	topic: string
	uid: string
}

export interface studentsType {
	age: string
	country: string
	discount: string
	email: string
	eng_level_form: string
	eng_level_test: string
	gender: string
	name: string
	num_of_ai_topics_created: number
	num_of_lessons: number
	num_of_lessons_left: number
	num_of_messages_with_fina_ai: number
	paid: boolean
	performance: string
	permit: boolean
	phone: string
	photo: string
	role: string
	subscription_end_date: string
	subscription_start_date: string
	subscription_type: null // Update with the actual type if needed
	uid: string
}

export interface convertToWeeklyObjectType {
	date_from: string
	date_to: string
	lessons: lessonTimetableType[]
}
