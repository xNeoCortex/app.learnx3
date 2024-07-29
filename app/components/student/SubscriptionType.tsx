import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

export default function SubscriptionType({
	subscriptionType,
	handleSubscriptionChange,
	isLoading,
}: {
	subscriptionType: string | null
	handleSubscriptionChange: (event: any) => void
	isLoading: boolean
}) {
	if (isLoading) return <div>Loading...</div>

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<Select
				labelId="demo-select-small-label"
				id="demo-select-small"
				value={subscriptionType || "free"}
				onChange={handleSubscriptionChange}
			>
				<MenuItem value={"free"}>Free</MenuItem>
				<MenuItem value={"speaking"}>Speaking</MenuItem>
				<MenuItem value={"pro"}>Pro</MenuItem>
			</Select>
		</FormControl>
	)
}
