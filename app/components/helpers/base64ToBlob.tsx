export function base64ToBlob(imageDataB64: string | undefined) {
	if (!imageDataB64) return
	const byteCharacters = atob(imageDataB64)
	const byteArrays = []

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512)
		const byteNumbers = new Array(slice.length)

		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)
		byteArrays.push(byteArray)
	}

	return new Blob(byteArrays, { type: "image/jpeg" })
}
