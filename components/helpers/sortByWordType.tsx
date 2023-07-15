function sortByWordType(a, b) {
	if (a.category === "noun") {
		return -1
	} else if (b.category === "noun") {
		return 1
	} else if (a.category === "verb") {
		return -1
	} else if (b.category === "verb") {
		return 1
	} else if (a.category === "adjective") {
		return -1
	} else if (b.category === "adjective") {
		return 1
	} else {
		return -1
	}
}

export default sortByWordType
