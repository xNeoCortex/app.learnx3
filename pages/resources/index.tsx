import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Box, CardMedia, CssBaseline, Grid, Typography } from "@mui/material"
import { ResourcesData } from "../../components/data/ResourcesData"
import CardWrapper from "../../components/elements/CardWrapper"

function Resources() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Box sx={{ marginTop: "20px", flexGrow: 1 }}>
					<CssBaseline />
					<h3
						style={{
							margin: "10px 10px 20px 0px",
							marginBottom: 20,
							fontWeight: 600,
							fontSize: 19,
							color: "#5f616a",
						}}
					>
						Study Resources
					</h3>

					<Grid container spacing={3}>
						{ResourcesData.map((item, index) => (
							<Grid item xs={12} sm={6} md={3}>
								<a href={item.link} target="_blank">
									<CardWrapper>
										<CardMedia
											component="img"
											image={`/${item.image}`}
											alt="book image"
											sx={{ maxHeight: "350px", objectFit: "contain" }}
										/>
									</CardWrapper>
								</a>
							</Grid>
						))}
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default Resources
