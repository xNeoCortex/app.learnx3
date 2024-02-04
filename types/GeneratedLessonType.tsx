export interface VocabularyType {
	type: string
	synonyms?: string[]
	definition: string
	word: string
	example?: string
}

export interface AssessmentType {
	assessment_type: string
	createdAt: string
	createdById: string
	level: string
	result: number
	student_id: string
	student_name: string
	topic: string
	uid: string
}

export interface QuestionsType {
	question: string
	options: { option: string; correct: boolean }[]
	response?: { option: string; correct: boolean }
}
export interface ExerciseType {
	questions: QuestionsType[]
	topic: string
	type: string
	name: string
}

export interface Conversation {
	order: number
	content: string
	speaker: string
}

export interface TopicContentType {
	phrases: string[]
	topic: string
	category: string
	exercise: ExerciseType
	createdAt: string
	questions: {
		sample_answer: string
		question: string
	}[]
	conversation: Conversation[]
}
