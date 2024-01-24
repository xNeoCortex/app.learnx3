interface Vocabulary {
	type: string
	word: string
	synonyms: string[]
	definition: string
	example: string
}

interface ConversationSegment {
	speaker: string
	content: string
	order: number
}

interface QuestionOption {
	option: string
	correct: boolean
}

interface MultipleChoiceQuestion {
	question: string
	options: QuestionOption[]
}

interface Exercise {
	name: string
	topic: string
	type: string
	questions: MultipleChoiceQuestion[]
}

export interface LessonType {
	uid: string
	level: string
	topic: string
	category: string
	assessment: any[] // Replace 'any' with the appropriate type for assessment data if needed
	vocabularies: Vocabulary[]
	conversation: ConversationSegment[]
	exercise: Exercise
	phrases: string[]
	questions: {
		question: string
		sample_answer: string
	}[]
}
