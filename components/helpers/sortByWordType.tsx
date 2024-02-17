import { VocabularyType } from "@/types/generatedLessonType"

function sortByWordType(a: VocabularyType, b: VocabularyType) {
	const order: {
		[key: string]: number
	} = { noun: 1, verb: 2, adjective: 3 }
	return order[a.type] - order[b.type]
}

export default sortByWordType
