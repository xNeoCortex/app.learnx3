import { Avatar, Box, Typography } from "@mui/material"

function WaitingPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "650px",
          background: "#5f6ac40f",
          borderRadius: "8px",
          padding: "30px",
          margin: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="/teacher-johny.png"
            sx={{
              cursor: "pointer",
              width: "120px",
              height: "120px",
              m: 1,
            }}
          />
          <Box>
            <Typography sx={{ fontSize: 28, m: "auto", marginLeft: "10px" }}>
              Kindly wait for the administrator to grant you access!
            </Typography>
            <Typography
              sx={{ fontSize: 14, m: "auto", marginLeft: "10px", mt: 1 }}
            >
              Please contact us via <strong>nekruz.avgani@gmail.com</strong> if
              you have not received authorization within 24 hours of completing
              the registration.
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default WaitingPage
