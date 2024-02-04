import { VocabularyType } from "@/types/GeneratedLessonType"

function sortByWordType(a: VocabularyType, b: VocabularyType) {
	if (a.type === "noun") {
		return -1
	} else if (b.type === "noun") {
		return 1
	} else if (a.type === "verb") {
		return -1
	} else if (b.type === "verb") {
		return 1
	} else if (a.type === "adjective") {
		return -1
	} else if (b.type === "adjective") {
		return 1
	} else {
		return -1
	}
}

export default sortByWordType
