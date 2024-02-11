import { memo } from "react"
import { TestResultType } from "@/types/types"
import { TableCell, TableRow, Typography, capitalize } from "@mui/material"

export const TestTableRow = memo(({ row, index }: { row: TestResultType; index: number }) => {
	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell
				component="th"
				scope="row"
				style={{
					display: "flex",
					alignItems: "center",
					padding: 10,
					height: 63,
					textAlign: "center",
				}}
			>
				<Typography style={{ margin: "auto" }}>Test {index + 1}</Typography>
			</TableCell>
			<TableCell style={{ padding: 10, height: 63, textAlign: "center" }}>{capitalize(row.topic)}</TableCell>
			<TableCell
				style={{
					padding: 10,
					height: 63,
				}}
			>
				<Typography
					style={{
						fontWeight: 600,
						padding: "3px 10px",
						background: "white",
						color: row.result <= 50 ? "rgb(226, 109, 128)" : row.result <= 70 ? "#5fc497" : "#41b6ff",
						border:
							row.result <= 50
								? "2px solid rgb(226, 109, 128)"
								: row.result <= 70
								? "2px solid #5fc497"
								: "2px solid #41b6ff",
						borderRadius: 12,
						fontSize: "13px",
						width: "100%",
						maxWidth: "70px",
						textAlign: "center",
						margin: "auto",
					}}
				>
					{row?.result !== null ? Math.round(row?.result) : "N/A"}
				</Typography>
			</TableCell>
		</TableRow>
	)
})
