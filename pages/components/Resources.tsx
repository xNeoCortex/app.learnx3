import { Box, Button, CardMedia, CssBaseline, Grid } from "@mui/material"
import { ResourcesData } from "../../components/data/ResourcesData"

function Resources(props) {
  return (
    <Box sx={{ marginTop: "20px", flexGrow: 1 }}>
      <CssBaseline />
      <h3
        style={{
          margin: 10,
          marginBottom: 20,
          fontWeight: 600,
          fontSize: 19,
          color: "#5f616a",
        }}
      >
        Study Resources
      </h3>
      <Box
        sx={{
          display: "inline-flex",
          flexWrap: "wrap",
          gap: "25px",
          margin: 1,
          marginBottom: 20,
        }}
      >
        {ResourcesData.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: "100%",
              width: "220px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              boxShadow:
                "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
            }}
          >
            <CardMedia
              component="img"
              image={`/${item.image}`}
              alt="test image"
              sx={{ maxHeight: "260px", objectFit: "contain" }}
            />

            <Box
              sx={{
                display: "flex",
                width: "100%",
                padding: "10px 13px",
                alignItems: "start",
                flexDirection: "column",
                fontSize: 16,
                fontWeight: 600,
                color: "rgb(50, 50, 93)",
              }}
            >
              <h4 style={{ minHeight: "48px" }}> {item.topic}</h4>
              <a href={item.link} target="_blank">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: "#0092e4",
                    boxShadow: "none",
                    fontWeight: 600,
                    textTransform: "none",
                    marginTop: "10px",
                  }}
                >
                  View
                </Button>
              </a>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Resources
