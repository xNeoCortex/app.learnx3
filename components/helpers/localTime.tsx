import React from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc" // Import the UTC plugin
import timezone from "dayjs/plugin/timezone" // Import the timezone plugin

// Extend dayjs with the plugins
dayjs.extend(utc)
dayjs.extend(timezone)

function localTime(time) {
	// Get the current UTC time
	const utcTime = dayjs(time).utc()

	// Convert UTC time to a specific time zone
	const timeZone = "Asia/Karachi" // Example time zone
	const zonedTime = utcTime.tz(timeZone)

	// Format the zoned time in the specified time zone
	// const formattedZonedTime = zonedTime.format("dddd, MMM D, h:mm A")

	return zonedTime
}

export default localTime
