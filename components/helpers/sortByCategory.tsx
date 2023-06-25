import React from "react"

function sortByCategory(a, b) {
	if (a.category === "vocabulary") {
		return -1
	} else if (b.category === "vocabulary") {
		return 1
	} else if (a.category === "speaking") {
		return -1
	} else if (b.category === "speaking") {
		return 1
	} else if (a.category === "writing") {
		return -1
	} else if (b.category === "writing") {
		return 1
	} else {
		return -1
	}
}

export default sortByCategory
