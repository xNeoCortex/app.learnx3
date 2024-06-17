export function getObject(text: string) {
	const start = text.indexOf("{")
	const end = text.lastIndexOf("}") + 1
	const objectText = text.substring(start, end)
	const objectResult = eval("(" + objectText + ")")
	if (typeof objectResult === "object") {
		return objectResult
	} else {
		return {}
	}
}
