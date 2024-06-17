export const setEnglishLevel = (word = "") => {
	if (word.length > 0) {
		if (word === "b1") return "Intermediate"
	} else {
		return word
	}
}
