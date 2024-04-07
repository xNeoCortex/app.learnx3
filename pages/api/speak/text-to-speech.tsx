// Imports the Google Cloud client library
import textToSpeech from "@google-cloud/text-to-speech"

// Import other required libraries
import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import util from "util"
// Creates a client
import { getAuth } from "@clerk/nextjs/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Clerk auth check
	const { userId } = getAuth(req)

	if (!userId) {
		return res.status(401).json({ message: "Not authenticated" })
	}

	if (req.method === "GET") {
		const { id } = req.query

		try {
			const client = new textToSpeech.TextToSpeechClient()
			// The text to synthesize
			const text = "hello, how are you!"

			// Construct the request
			const request = {
				input: { text: text },
				// Select the language and SSML voice gender (optional)
				voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
				// select the type of audio encoding
				audioConfig: { audioEncoding: "MP3" },
			}

			// Performs the text-to-speech request
			//@ts-ignore
			const [response] = await client.synthesizeSpeech(request)
			// Write the binary audio content to a local file
			const writeFile = util.promisify(fs.writeFile)
			await writeFile("output.mp3", response.audioContent, "binary")
			console.log("Audio content written to file: output.mp3")

			res.status(200).json(response)
		} catch (error) {
			console.error("Error getting student data: ", error)
			res.status(500).json({ message: "Internal server error" })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}
