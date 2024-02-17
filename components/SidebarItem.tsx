import { ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material"
import { FunctionComponent, memo } from "react"
import Link from "next/link"

const SidebarItem: FunctionComponent<{
	item: { name: string; href: string; link: string; icon: JSX.Element }
	pathname: string
}> = memo(({ item, pathname }) => {
	return (
		<Link href={item?.link}>
			<ListItem disablePadding>
				<ListItemButton
					className="onHover"
					sx={{
						color: pathname == item.href ? "rgb(4, 7, 24)" : "#BAB9CC",
						borderRadius: "5px",
						marginBottom: "5px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						maxWidth: "100px",
					}}
				>
					<ListItemIcon sx={{ color: "inherit", display: "flex", justifyContent: "center" }}>{item.icon}</ListItemIcon>
					<Typography sx={{ fontSize: 11, textAlign: "center", width: "100%" }}>{item.name}</Typography>
				</ListItemButton>
			</ListItem>
		</Link>
	)
})

export default SidebarItem
