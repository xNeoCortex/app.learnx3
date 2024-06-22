
//@ts-check

const {OpenAI} = require("openai")
const fs = require("fs")
const path = require("path")
const os = require("os")

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions")

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
const {getStorage} = require("firebase-admin/storage");

initializeApp()
const storage = getStorage()


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloworld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.randomnumber = functions.https.onRequest((request, response) => {
  response.send(Math.floor(Math.random() * 100).toString());
});


// callable function
exports.sayhello = functions.https.onCall((data, context) => {
  return `Hello, ${data.name}!`;
});


exports.downloadaudio = functions.https.onCall((data, context) => {
	const { audioFilePath } = data

	const bucket = storage.bucket()
	const file = bucket.file(audioFilePath)

	return file
		.download()
		.then((data) => {
			const audioData = data[0]

    return audioData

		})
		.catch((error) => {
			console.error("Error downloading audio file:", error)
			throw new functions.https.HttpsError("internal", error)
		})
})