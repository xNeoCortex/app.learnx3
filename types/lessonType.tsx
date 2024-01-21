interface Vocabulary {
	type: string
	synonyms?: string[]
	definition: string
	word: string
	example?: string
}

interface Assessment {
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

interface Exercise {
	questions: {
		question: string
		options: { option: string; correct: boolean }[]
	}[]
	topic: string
	type: string
	name: string
}

interface Conversation {
	order: number
	content: string
	speaker: string
}

interface TopicContent {
	phrases: string[]
	topic: string
	category: string
	exercise: Exercise
	createdAt: string
	questions: {
		sample_answer: string
		question: string
	}[]
	conversation: Conversation[]
}
