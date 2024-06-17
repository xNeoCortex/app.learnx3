import React from "react"
import { Avatar } from "@mui/material"

function CustomAvatar({
	image,
	gender,
	style,
}: {
	image?: string | null
	gender: string
	style?: React.CSSProperties
}) {
	return (
		<Avatar
			src={image ? image : gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
			sx={{ border: "3px solid rgb(95, 106, 196)", bgcolor: "white", width: 100, height: 100, ...style }}
		/>
	)
}

export default CustomAvatar
